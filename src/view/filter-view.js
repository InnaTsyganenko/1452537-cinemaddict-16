import AbstractView from './abstract-view.js';

const createFilterTemplate = (filters, currentFilterType) => `<div class="main-navigation__items">
  ${filters.map((filter) => `<a href="#${filter.type}" class="main-navigation__item main-navigation__item${filter.type === currentFilterType ? '--active' : ''}" data-filter-type="${filter.type}">${filter.name}
  ${filter.type !== 'all'
    ? `<span class="main-navigation__item-count" data-filter-type="${filter.type}">${filter.count}</span>`
    : ''}
    </a>`).join('')}
  </div>`;

export default class FilterView extends AbstractView {
  #filters = null;
  #currentFilterType = null;

  constructor(filters, currentFilterType) {
    super();
    this.#filters = filters;
    this.#currentFilterType = currentFilterType;
  }

  get template() {
    return createFilterTemplate(this.#filters, this.#currentFilterType);
  }

  setFilterTypeChangeHandler = (callback) => {
    this._callback.filterTypeChange = callback;
    this.element.querySelectorAll('.main-navigation__item').forEach((link) => link.addEventListener('click', this.#filterTypeChangeHandler));
  }

  #filterTypeChangeHandler = (evt) => {
    evt.preventDefault();
    this._callback.filterTypeChange(evt.target.dataset.filterType);
  }
}
