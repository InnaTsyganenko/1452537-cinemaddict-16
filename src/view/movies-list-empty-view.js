import {createElement} from '../render.js';

export const createMovieListEmptyTemplate = () => (
  `<h2 class="films-list__title">
    There are no movies in our database
    <!--
          Значение отображаемого текста зависит от выбранного фильтра:
            * All movies – 'There are no movies in our database'
            * Watchlist — 'There are no movies to watch now';
            * History — 'There are no watched movies now';
            * Favorites — 'There are no favorite movies now'.
        -->
  </h2>`
);

export default class MoviesListEmptyView {
  #element = null;
  #movies = null;

  constructor(movies) {
    this.#movies = movies;
  }

  get element() {
    if (!this.#element) {
      this.#element = createElement(this.template);
    }

    return this.#element;
  }

  get template() {
    return createMovieListEmptyTemplate(this.#movies);
  }

  removeElement() {
    this.#element = null;
  }
}
