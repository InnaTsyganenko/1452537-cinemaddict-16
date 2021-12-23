import AbstractView from './abstract-view.js';
import {FilterType} from '../const.js';

const createFilterTemplate = (movies, isActive) => {
  const isInWatchlist = movies.filter((movie) => movie.userDetails.isInWatchlist).length;
  const isAlreadyWatched = movies.filter((movie) => movie.userDetails.isAlreadyWatched).length;
  const isInFavorite = movies.filter((movie) => movie.userDetails.isInFavorite).length;

  return `<div class="main-navigation__items">
    <a href="#all" class="main-navigation__item main-navigation__item${isActive === FilterType.ALL ? '--active' : ''}" data-filter-type="${FilterType.ALL}">All movies</a>

    <a href="#watchlist" class="main-navigation__item main-navigation__item${isActive === FilterType.WATCHLIST ? '--active' : ''}" data-filter-type="${FilterType.WATCHLIST}">Watchlist <span class="main-navigation__item-count">
    ${isInWatchlist}</span></a>

    <a href="#history" class="main-navigation__item main-navigation__item${isActive === FilterType.HISTORY ? '--active' : ''}" data-filter-type="${FilterType.HISTORY}">History <span class="main-navigation__item-count">${isAlreadyWatched}</span></a>

    <a href="#favorites" class="main-navigation__item main-navigation__item${isActive === FilterType.FAVORITES ? '--active' : ''}" data-filter-type="${FilterType.FAVORITES}">Favorites <span class="main-navigation__item-count">${isInFavorite}</span></a>

  </div>`;
};

export default class FilterView extends AbstractView {
  #movies = null;
  #isActive = null;

  constructor(movies, isActive) {
    super();
    this.#movies = movies;
    this.#isActive = isActive;
  }

  get template() {
    return createFilterTemplate(this.#movies, this.#isActive);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.addEventListener('click', this.#filterTypeChangeHandler);
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }
}
