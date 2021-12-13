import AbstractView from './abstract-view.js';
import {formatRunTime} from '../utils/movie';
import {createMovieCardControlsTemplate} from './movie-card-controls-view';

const createMovieCardTemplate = (movie) => `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${movie.filmInfo.title}</h3>
      <p class="film-card__rating">${movie.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.filmInfo.release.date.format('YYYY')}</span>
        <span class="film-card__duration">${formatRunTime(movie.filmInfo.runtime)}</span>
        <span class="film-card__genre">${movie.filmInfo.genres[0]}</span>
      </p>
      <img src="${movie.filmInfo.poster}" alt="Постер фильма &laquo;${movie.filmInfo.title}&raquo;" class="film-card__poster">
      <p class="film-card__description">${movie.filmInfo.description.length >= 140
    ? `${movie.filmInfo.description.slice(0, 139)}..`
    : movie.filmInfo.description}
      </p>
      <span class="film-card__comments">${movie.comments.length === 0 ? 'No' : movie.comments.length} comments</span>
    </a>
    ${createMovieCardControlsTemplate(movie.userDetails)}
  </article>`;

export default class MovieCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  setClickHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#clickHandler);
  }

  #clickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
  }
}
