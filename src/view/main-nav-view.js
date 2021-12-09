import {createElement} from '../render.js';
import {createFilterTemplate} from './filter-view';

const createMainNavTemplate = (movies, isActive) => `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${createFilterTemplate(movies, isActive)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;


export default class MainNavView {
  #element = null;
  #movies = null;
  #isActive = null;

  constructor(movies, isActive) {
    this.#movies = movies;
    this.#isActive = isActive;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMainNavTemplate(this.#movies, this.#isActive);
  }

  removeElement() {
    this.#element = null;
  }
}
