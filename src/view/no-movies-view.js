import {createElement} from '../render.js';

export const NoMovieTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class NoMovieView {
  #element = null;

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return NoMovieTemplate();
  }

  removeElement() {
    this.#element = null;
  }
}
