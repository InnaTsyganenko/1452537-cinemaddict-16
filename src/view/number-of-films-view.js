import {createElement} from '../render.js';

const createNumberOfFilmsTemplate = (moviesCount) => (
  `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`
);

export default class NumberOfFilmsView {
  #element = null;
  #moviesCount = null;

  constructor(moviesCount) {
    this.#moviesCount = moviesCount;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createNumberOfFilmsTemplate(this.#moviesCount);
  }

  removeElement() {
    this.#element = null;
  }
}
