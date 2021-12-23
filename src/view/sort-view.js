import AbstractView from './abstract-view.js';
import {SortType} from '../const.js';

const createSortTemplate = (currentSortType, sorts) => `<ul class="sort">${sorts.map((sort) => `<li><a href="#" class="sort__button sort__button${currentSortType === sort.type ? '--active' : ''}" data-sort-type="${sort.type}">${sort.name}</a></li>`).join('')}
  </ul>`;

export default class SortView extends AbstractView {
  #currentSortType = null;

  constructor(currentSortType) {
    super();
    this.#currentSortType = currentSortType;
  }

  get template() {
    return createSortTemplate(this.#currentSortType, this.#getSorts());
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #getSorts = () => [
    {
      type: SortType.DEFAULT,
      name: 'Sort by default'
    },
    {
      type: SortType.DATE,
      name: 'Sort by date'
    },
    {
      type: SortType.RATING,
      name: 'Sort by rating'
    },
  ]

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);

    [].forEach.call(this.element.querySelectorAll('.sort__button--active'), (item) => item.classList.remove('sort__button--active'));
    evt.target.classList.add('sort__button--active');
  }
}
