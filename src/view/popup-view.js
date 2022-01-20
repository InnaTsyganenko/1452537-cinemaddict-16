import SmartView from './smart-view.js';
import {formatRunTime} from '../utils/movie';
import {createPopupGenresTemplate} from './popup-genres-view';
import {EMOTIONS, CONTROLS_BUTTON} from '../const';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import he from 'he';

dayjs.extend(relativeTime);

const NEW_COMMENT = {
  comment: '',
  emotion: '',
};

const createCommentEmotionsTemplate = (isDisabled) => (
  EMOTIONS.map((emotion) => `<input
    class="film-details__emoji-item visually-hidden"
    name="comment-emoji"
    type="radio"
    id="emoji-${emotion}"
    value="${emotion}"
    ${isDisabled ? 'disabled' : ''}
  />
  <label
    class="film-details__emoji-label"
    for="emoji-${emotion}">
    <img src="./images/emoji/${emotion}.png" width="30" height="30" alt="emoji-${emotion}">
  </label>`).join('')
);

const createPopupCommentsListTemplate = (comments, isDisabled, deleteCommentId) => comments.sort((a, b) => (new Date(b.date) - new Date(a.date))).map((comment) => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
    ${comment.emotion === undefined ? '' : `<img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">`}
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">
        ${comment.date === dayjs() || comment.date >= dayjs().subtract(10, 'second')
    ? 'now'
    : dayjs(comment.date).fromNow()}</span>
        <button class="film-details__comment-delete" id="${comment.id}" ${isDisabled ? 'disabled' : ''}>${isDisabled && deleteCommentId === comment.id ?'Deleting...' : 'Delete'}</button>
      </p>
    </div>
  </li>`).join('');

const createPopupControlsTemplate = (movie) => (
  CONTROLS_BUTTON.map((control) => `<button
    type="button"
    class="film-details__control-button film-details__control-button--${control} film-details__control-button${control === 'watchlist' && movie.userDetails.isInWatchlist ? '--active' : ''}${control === 'watched' && movie.userDetails.isAlreadyWatched ? '--active' : ''}${control === 'favorite' && movie.userDetails.isInFavorite ? '--active' : ''}"
    id="${control}"
    name="${control}">
    ${control === 'watchlist' ? `Add to ${control}` : ''}
    ${control === 'watched' ? `Already ${control}` : ''}
    ${control === 'favorite' ? `Add to ${control}` : ''}
  </button>`).join('')
);

const createPopupTemplate = (movie, newComment, deleteCommentId) => {
  const {filmInfo, comments, commentsData, isDisabled} = movie;

  const controlsTemplate = createPopupControlsTemplate(movie);

  return `<section class="film-details" id="${movie.id}">
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
                <td class="film-details__cell">${dayjs(filmInfo.release.date).format('DD MMMM YYYY')}</td>
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
                <td class="film-details__term">${filmInfo.genres.length > 1 ? 'Genres' : 'Genre'}</td>
                <td class="film-details__cell">
                  ${createPopupGenresTemplate(filmInfo.genres)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          ${controlsTemplate}
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${comments.length}</span></h3>

          ${commentsData === undefined ? '' :
    `<ul class="film-details__comments-list">
      ${createPopupCommentsListTemplate(commentsData, isDisabled, deleteCommentId)}
    </ul>`}

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label">
              ${newComment.emotion !== ''
    ? `<img src="images/emoji/${newComment.emotion}.png" width="55" height="55" alt="emoji-${newComment.emotion}">`
    : ''}
            </div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment" ${isDisabled ? 'disabled' : ''}></textarea>
            </label>

            <div class="film-details__emoji-list">
              ${createCommentEmotionsTemplate(isDisabled)}
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

export default class PopupView extends SmartView {
  #newComment = null;
  #deleteCommentId = null;

  constructor(movie, newComment = NEW_COMMENT) {
    super();

    this._data = PopupView.parseMovieToData(movie);
    this.#newComment = PopupView.parseCommentToData(newComment);

    this.#setInnerHandlers();
  }

  get template() {
    return createPopupTemplate(this._data, this.#newComment, this.#deleteCommentId);
  }

  restoreHandlers = () => {
    this.setClosePopupHandler(this._callback.closeClick);
    this.setMoviePopupWatchlistClickHandler(this._callback.watchlistClick);
    this.setMoviePopupWatchedClickHandler(this._callback.watchedClick);
    this.setMoviePopupFavoriteClickHandler(this._callback.favoriteClick);
    this.setPopupDeleteCommentHandler(this._callback.deleteCommentClick);
    this.setPopupAddCommentHandler(this._callback.addCommentClick);
    this.#setInnerHandlers();
  }

  #ctrlEnterKeyDownHandler = (evt) => {
    if (evt.ctrlKey && evt.key === 'Enter') {
      evt.preventDefault();
      this._callback.addCommentClick(this.#newComment);
    }
  }

  setClosePopupHandler = (callback) => {
    this._callback.closeClick = callback;
    this.element.querySelector('.film-details__close-btn').addEventListener('click', this.#closePopupClickHandler);
  }

  setMoviePopupWatchlistClickHandler = (callback) => {
    this._callback.watchlistClick = callback;
    this.element.querySelector('.film-details__control-button--watchlist').addEventListener('click', this.#movieWatchlistClickHandler);
  }

  setMoviePopupWatchedClickHandler = (callback) => {
    this._callback.watchedClick = callback;
    this.element.querySelector('.film-details__control-button--watched').addEventListener('click', this.#movieWatchedClickHandler);
  }

  setMoviePopupFavoriteClickHandler = (callback) => {
    this._callback.favoriteClick = callback;
    this.element.querySelector('.film-details__control-button--favorite').addEventListener('click', this.#movieFavoriteClickHandler);
  }

  setPopupDeleteCommentHandler = (callback) => {
    this._callback.deleteCommentClick = callback;
    this.element.querySelectorAll('.film-details__comment-delete').forEach((deleteButton) => deleteButton.addEventListener('click', this.#deleteCommentHandler));
  }

  setPopupAddCommentHandler = (callback) => {
    this._callback.addCommentClick = callback;
    this.element.querySelector('.film-details__new-comment').addEventListener('keydown', this.#ctrlEnterKeyDownHandler);
  }

  #setInnerHandlers = () => {
    this.element.querySelectorAll('.film-details__emoji-item').forEach((emotion) => emotion.addEventListener('click', this.#emotionToggleHandler));

    this.element.querySelector('.film-details__comment-input').addEventListener('change', this.#getCommentTextHandler);

    this.element.querySelector('.film-details__new-comment').addEventListener('keydown', this.#ctrlEnterKeyDownHandler);
  }

  #closePopupClickHandler = (evt) => {
    evt.preventDefault();
    this._callback.closeClick();
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

  #emotionToggleHandler = (evt) => {
    evt.preventDefault();
    this.#newComment.emotion = evt.target.value;
    this.updateElement();
    this.element.querySelector('.film-details__comment-input').focus();
  }

  #getCommentTextHandler = (evt) => {
    evt.preventDefault();
    this.#newComment.comment = he.encode(evt.target.value);
  }

  #deleteCommentHandler = (evt) => {
    evt.preventDefault();
    this.#deleteCommentId = evt.target.id;
    this._callback.deleteCommentClick(evt.target.id);
  }

  static parseMovieToData = (movie) => ({...movie,
    isDisabled: false,
    isDeleting: false,});

  static parseCommentToData = (comment) => ({...comment});

  static parseDataToMovie = (data) => {
    const movie = {...data};

    delete movie.isDisabled;
    delete movie.isDeleting;

    return movie;
  }
}
