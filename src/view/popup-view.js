import AbstractView from './abstract-view.js';
import {formatRunTime} from '../utils/movie';
import {createPopupGenresTemplate} from './popup-genres-view';
import {createPopupCommentsListTemplate} from './popup-comments-view';

const createPopupTemplate = (movie) => {
  const {filmInfo} = movie;

  const watchlistClassActive = movie.userDetails.isInWatchlist
    ? '--active'
    : '';

  const alreadyWatchedClassActive = movie.userDetails.isAlreadyWatched
    ? '--active'
    : '';

  const favoriteClassActive = movie.userDetails.isInFavorite
    ? '--active'
    : '';

  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="Постер фильма &laquo;${filmInfo.title}&raquo;">

            <p class="film-details__age">${`${filmInfo.ageRating}+`}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmInfo.release.date.format('DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${formatRunTime(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${createPopupGenresTemplate(filmInfo.genres)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button
            type="button"
            class="film-details__control-button film-details__control-button--watchlist film-details__control-button${watchlistClassActive}"
            id="watchlist"
            name="watchlist">
            Add to watchlist
          </button>

          <button
            type="button"
            class="film-details__control-button film-details__control-button--watched film-details__control-button${alreadyWatchedClassActive}"
            id="watched"
            name="watched">
            Already watched
          </button>

          <button
            type="button"
            class="film-details__control-button film-details__control-button--favorite film-details__control-button${favoriteClassActive}"
            id="favorite"
            name="favorite">
            Add to favorites
          </button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${createPopupCommentsListTemplate(movie.comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends AbstractView {
  #movie = null;
  #mode = null;

  constructor(movie, mode) {
    super();
    this.#movie = movie;
    this.#mode = mode;
  }

  get template() {
    return createPopupTemplate(this.#movie, this.#mode);
  }

  setClosePopupHandler = (callback) => {
    this._callback.click = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.click();
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
