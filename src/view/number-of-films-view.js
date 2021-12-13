import AbstractView from './abstract-view.js';

const createNumberOfFilmsTemplate = (moviesCount) => (
  `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`
);

export default class NumberOfFilmsView extends AbstractView {
  #moviesCount = null;

  constructor(moviesCount) {
    super();
    this.#moviesCount = moviesCount;
  }

  get template() {
    return createNumberOfFilmsTemplate(this.#moviesCount);
  }
}
