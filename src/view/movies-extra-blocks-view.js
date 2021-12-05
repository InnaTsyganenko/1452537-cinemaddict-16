import {createElement} from '../render.js';

const createMoviesExtraBlocksTemplate = (title) => `<section class="films-list films-list--extra">
    <h2 class="films-list__title">${title}</h2>
    <div class="films-list__container">
    </div>
  </section>`;

export default class MoviesExtraBlocksView {
  #element = null;
  #title = null;

  constructor(title) {
    this.#title = title;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMoviesExtraBlocksTemplate(this.#title);
  }

  removeElement() {
    this.#element = null;
  }
}
