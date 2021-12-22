import AbstractView from './abstract-view.js';
import {SortType} from '../const.js';

const createSortTemplate = (isActive) => (
  `<ul class="sort">
    <li><a href="#" class="sort__button sort__button${isActive === SortType.DEFAULT ? '--active' : ''}" data-sort-type="${SortType.DEFAULT}">Sort by default</a></li>
    <li><a href="#" class="sort__button sort__button${isActive === SortType.DATE ? '--active' : ''}" data-sort-type="${SortType.DATE}">Sort by date</a></li>
    <li><a href="#" class="sort__button sort__button${isActive === SortType.RATING ? '--active' : ''}" data-sort-type="${SortType.RATING}">Sort by rating</a></li>
  </ul>`
);

export default class SortView extends AbstractView {
  #isActive = null;

  constructor(isActive) {
    super();
    this.#isActive = isActive;
  }

  get template() {
    return createSortTemplate(this.#isActive);
  }

  setSortTypeChangeHandler = (callback) => {
    this._callback.sortTypeChange = callback;
    this.element.addEventListener('click', this.#sortTypeChangeHandler);
  }

  #sortTypeChangeHandler = (evt) => {
    if (evt.target.tagName !== 'A') {
      return;
    }

    evt.preventDefault();
    this._callback.sortTypeChange(evt.target.dataset.sortType);
  }
}
