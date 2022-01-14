import AbstractObservable from '../utils/abstract-observable.js';

export default class UserInfoModel extends AbstractObservable {
  #movieHistoryCount = null;

  get movieHistoryCount() {
    return this.#movieHistoryCount;
  }

  setMovieCount = (movieHistoryCount) => {
    this.#movieHistoryCount = movieHistoryCount;
    this._notify();
  }
}
