import AbstractView from './abstract-view.js';
import {createFilterTemplate} from './filter-view';

const createMainNavTemplate = (movies, isActive) => `<nav class="main-navigation">
    <div class="main-navigation__items">
    ${createFilterTemplate(movies, isActive)}
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export default class MainNavView extends AbstractView {
  #movies = null;
  #isActive = null;

  constructor(movies, isActive) {
    super();
    this.#movies = movies;
    this.#isActive = isActive;
  }

  get template() {
    return createMainNavTemplate(this.#movies, this.#isActive);
  }
}
