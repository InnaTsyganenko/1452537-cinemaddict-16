import AbstractView from './abstract-view.js';
import {FilterType} from '../const.js';

const createFilterTemplate = (movies, filters, currentFilterType) => {
  const isInWatchlist = movies.filter((movie) => movie.userDetails.isInWatchlist).length;
  const isAlreadyWatched = movies.filter((movie) => movie.userDetails.isAlreadyWatched).length;
  const isInFavorite = movies.filter((movie) => movie.userDetails.isInFavorite).length;

  return `<div class="main-navigation__items">
  ${filters.map((filter) => `<a href="#${filter.type}" class="main-navigation__item main-navigation__item${currentFilterType === filter.type ? '--active' : ''}" data-filter-type="${filter.type}">${filter.name}
  ${filter.type !== 'all'
    ? `<span class="main-navigation__item-count" data-filter-type="${filter.type}">
        ${filter.type === FilterType.WATCHLIST ? isInWatchlist : ''}
        ${filter.type === FilterType.HISTORY ? isAlreadyWatched : ''}
        ${filter.type === FilterType.FAVORITES ? isInFavorite : ''}
    </span>`
    : ''}
    </a>`).join('')}
  </div>`;
};

export default class FilterView extends AbstractView {
  #movies = null;
  #currentFilterType = null;

  constructor(movies, currentFilterType) {
    super();
    this.#movies = movies;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#movies, this.#getFilters(), this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((link) => link.addEventListener('click', this.#filterTypeChangeHandler));
  }

  #getFilters = () => [
    {
      type: FilterType.ALL,
      name: 'All movies'
    },
    {
      type: FilterType.WATCHLIST,
      name: 'Watchlist'
    },
    {
      type: FilterType.HISTORY,
      name: 'History'
    },
    {
      type: FilterType.FAVORITES,
      name: 'Favorites'
    },
  ]

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);

    [].forEach.call(this.element.querySelectorAll('.main-navigation__item--active'), (item) => item.classList.remove('main-navigation__item--active'));
    evt.target.classList.add('main-navigation__item--active');
  }
}
