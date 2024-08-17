import type { IState } from './index';

const getInitialState = (): IState => ({
  error: null,
  isFetching: false,
  isFirstRender: true,
  isFirstPage: true,
  isLastPage: false,
  hasPreviousPage: false,
  hasNextPage: true,
  pageSize: 20,
  page: 1,
  totalPages: 0,
  count: 0,
  firstPageNumber: 1,
  lastPageNumber: 0,
  pages: [1],
});

export default getInitialState;
