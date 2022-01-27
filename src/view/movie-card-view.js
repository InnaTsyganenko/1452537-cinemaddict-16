import AbstractView from './abstract-view.js';
import dayjs from 'dayjs';
import {formatRunTime} from '../utils/movie';
import {controls} from '../const';

const createPopupControlsTemplate = (movie) => (
  controls.map((control) => `<button
    class="film-card__controls-item
    ${control === 'watchlist' ? `film-card__controls-item--add-to-${control}` : ''}
    ${control === 'watchlist' && movie.userDetails.isInWatchlist ? 'film-card__controls-item--active' : ''}
    ${control === 'watched' ? `film-card__controls-item--mark-as-${control}` : ''}
    ${control === 'watched' && movie.userDetails.isAlreadyWatched ? 'film-card__controls-item--active' : ''}
    ${control === 'favorite' ? `film-card__controls-item--${control}` : ''}
    ${control === 'favorite' && movie.userDetails.isInFavorite ? 'film-card__controls-item--active' : ''}"
    type="button">
    ${control === 'watchlist' ? `Add to ${control}` : ''}
    ${control === 'watched' ? `Mark as ${control}` : ''}
    ${control === 'favorite' ? `Mark as ${control}` : ''}
  </button>`).join('')
);

const createMovieCardTemplate = (movie) => {
  const controlsTemplate = createPopupControlsTemplate(movie);

  return `<article class="film-card" id=${movie.id}>
    <a class="film-card__link">
      <h3 class="film-card__title">${movie.filmInfo.title}</h3>
      <p class="film-card__rating">${movie.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${dayjs(movie.filmInfo.release.date).format('YYYY')}</span>
        <span class="film-card__duration">${formatRunTime(movie.filmInfo.runtime)}</span>
        <span class="film-card__genre">${movie.filmInfo.genres[0]}</span>
      </p>
      <img src="${movie.filmInfo.poster}" alt="Постер фильма &laquo;${movie.filmInfo.title}&raquo;" class="film-card__poster">
      <p class="film-card__description">${movie.filmInfo.description.length > 140
    ? `${movie.filmInfo.description.slice(0, 139)}...`
    : movie.filmInfo.description}
      </p>
      <span class="film-card__comments">${movie.comments.length === 0 ? 'No' : movie.comments.length} comments</span>
    </a>
    <div class="film-card__controls">
        ${controlsTemplate}
    </div>
  </article>`;
};

export default class MovieCardView extends AbstractView {
  #movie = null;

  constructor(movie) {
    super();
    this.#movie = movie;
  }

  get template() {
    return createMovieCardTemplate(this.#movie);
  }

  setMovieLinkClickHandler = (callback) => {
    this._callback.linkClick = callback;
    this.element.querySelector('.film-card__link').addEventListener('click', this.#movieLinkClickHandler);
  }

  setMovieWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-card__controls-item--add-to-watchlist').addEventListener('click', this.#movieWatchlistClickHandler);
  }


  setMovieWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-card__controls-item--mark-as-watched').addEventListener('click', this.#movieWatchedClickHandler);
  }

  setMovieFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-card__controls-item--favorite').addEventListener('click', this.#movieFavoriteClickHandler);
  }

  #movieLinkClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.linkClick();
  }

  #movieWatchlistClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchlistClick();
  }

  #movieWatchedClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.watchedClick();
  }

  #movieFavoriteClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.favoriteClick();
  }
}
