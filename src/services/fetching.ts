import { action, makeObservable, observable } from 'mobx';

class Fetching {
  /**
   * isFetching on submit
   */
  public isFetching = false;

  /**
   * @constructor
   */
  constructor() {
    makeObservable(this, {
      isFetching: observable,
      setFetching: action.bound,
    });
  }

  /**
   * Set is loading
   */
  public setFetching(isLoading: boolean): void {
    this.isFetching = isLoading;
  }
}

export default Fetching;
