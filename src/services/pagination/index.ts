import _ from 'lodash';
import type { IReactionDisposer } from 'mobx';
import { action, makeObservable, observable, reaction } from 'mobx';
import getInitialState from './default-state';

export type IRequestReturn<TEntity> =
  | { count?: number; data: TEntity[]; page: number }
  | string
  | undefined;

type TEntitiesFunc<TEntity> = (page?: number) => Promise<IRequestReturn<TEntity>>;

interface IPaginationParams<TEntity> {
  getEntities: TEntitiesFunc<TEntity>;
  entities?: TEntity[];
  initState?: Partial<typeof getInitialState>;
  shouldAdd?: boolean;
  isLocal?: boolean;
}

export interface IState {
  error: string | null;
  isFetching: boolean;
  isFirstRender: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  pageSize: number;
  page: number;
  totalPages: number;
  count: number;
  firstPageNumber: number;
  lastPageNumber: number;
  pages: number[];
  filter?: string;
  orderBy?: string;
}

/**
 * Pagination
 */
class Pagination<TEntity> {
  /**
   * List of entities
   */
  public entities: TEntity[] = [];

  /**
   * Pagination state
   */
  public state: IState;

  /**
   * Default error message
   */
  public defaultErrorMsg = 'Unknown error';

  /**
   * Get table entities
   */
  public getEntities: IPaginationParams<TEntity>['getEntities'];

  /**
   * List will be paginated via infinite scroll or with pages buttons
   * @private
   */
  private shouldAdd: boolean;

  /**
   * Add protection on push duplicates for strict mode if true
   * @private
   */
  private readonly isLocal: boolean;

  /**
   * @constructor
   */
  constructor({
    getEntities,
    initState = {},
    shouldAdd = false,
    isLocal = false,
  }: IPaginationParams<TEntity>) {
    this.shouldAdd = shouldAdd;
    this.isLocal = isLocal;
    this.state = { ...getInitialState(), ...initState };
    this.getEntities = this.wrapRequest(getEntities);

    makeObservable(this, {
      entities: observable,
      state: observable,
      setEntities: action.bound,
      setFetching: action.bound,
      setPageSize: action.bound,
      setPage: action.bound,
      setError: action.bound,
      setTotalCount: action.bound,
      resetState: action.bound,
      resetIsFirstRender: action.bound,
      setHasNextPage: action.bound,
      setHasPreviousPage: action.bound,
    });
  }
  /**
   * Serialize observable data for SSR
   */
  public toJSON = (): { entities: TEntity[]; state: IState } => ({
    entities: this.entities,
    state: this.state,
  });

  /**
   * Serialize pagination service for SSR
   */
  public static create = <
    TContext extends { pagination: Pagination<unknown>; getEntities: TEntitiesFunc<unknown> },
  >(
    context: TContext,
  ) => {
    const paginationState = context.pagination;

    context.pagination = new Pagination({
      getEntities: context.getEntities,
      shouldAdd: true,
    });

    context.pagination.entities = paginationState?.entities;
    context.pagination.state = paginationState?.state;

    context.getEntities = context.pagination.getEntities;
  };

  /**
   * Add state subscribers
   * Get entities when state changed
   */
  public addSubscribe = (): IReactionDisposer =>
    reaction(
      () => ({
        page: this.state.page,
        pageSize: this.state.pageSize,
      }),
      () => void this.getEntities(),
    );

  /**
   * Reset state before retry requests
   */
  public resetIsFirstRender(): void {
    this.state.isFirstRender = true;
  }

  /**
   * Reset table store
   */
  public resetState(): void {
    this.state = getInitialState();
    this.setEntities([]);
  }

  /**
   * Set error message
   */
  public setError(message: string | null): void {
    this.state.error = message;
  }

  /**
   * Set page size
   */
  public setPageSize(count: number): void {
    this.state.pageSize = count;
    this.setPage(1);
  }

  /**
   * Set current page
   */
  public setPage(page: number): void {
    this.state.page = page;
  }

  /**
   * Set shouldAdd only on init
   */
  public setShouldAdd(shouldAdd: boolean): void {
    this.shouldAdd = shouldAdd;
  }

  /**
   * Set list entities
   */
  public setEntities(entities: TEntity[], shouldAdd = false): void {
    if (shouldAdd) {
      // Add protection on push duplicates for strict mode
      if (this.isLocal) {
        const isDuplicatedResult = this.entities.some((el) => _.isEqual(el, entities?.[0]));

        if (isDuplicatedResult) {
          return;
        }
      }

      this.entities.push(...entities);
    } else {
      this.entities = entities;
    }
  }

  /**
   * Wrapper for get entities
   */
  public wrapRequest(callback: TEntitiesFunc<TEntity>): TEntitiesFunc<TEntity> {
    this.getEntities = async (pageVal) => {
      this.setError(null);
      this.setFetching(true);

      const result = await callback(pageVal ?? this.state.page);

      this.setFetching(false);

      if (result === undefined) {
        return;
      }

      if (typeof result === 'string') {
        this.setError(result ?? this.defaultErrorMsg);

        return;
      }

      if (!result.page) {
        result.page = 1;
      }

      const { data, count, page } = result;

      this.setPage(page);
      this.setTotalCount(count ?? data.length);
      this.setEntities(data, page > 1 && this.shouldAdd);
      this.setHasNextPage();
      this.setHasPreviousPage();

      return result;
    };

    return this.getEntities;
  }

  /**
   * Toggle fetching
   */
  public setFetching(isFetching: boolean): void {
    this.state.isFetching = isFetching;

    if (!this.state.isFetching) {
      this.state.isFirstRender = false;
    }
  }

  /**
   * Lazy load pagination
   */
  public getNextPage = (): Promise<IRequestReturn<TEntity>> | undefined => {
    const { page, pageSize, count } = this.state;

    if (page * pageSize >= count) {
      return;
    }

    if (this.entities.length >= count) {
      return;
    }

    if (page === 1 && count < pageSize) {
      return;
    }

    return this.getEntities(page + 1);
  };

  /**
   * Get prev page
   */
  public getPrevPage = (): Promise<IRequestReturn<TEntity>> | undefined => {
    const { page } = this.state;

    if (page <= 1) {
      return;
    }

    return this.getEntities(page - 1);
  };

  /**
   * Set count entities
   */
  public setTotalCount(count: number): void {
    this.state.count = count;
  }

  /**
   * Set has next page state
   */
  public setHasNextPage(): void {
    const { count, page, pageSize } = this.state;

    this.state.hasNextPage = count > page * pageSize;
  }

  /**
   * Set has previous page state
   */
  public setHasPreviousPage(): void {
    const { page } = this.state;

    this.state.hasPreviousPage = page > 1;
  }
}

export default Pagination;
