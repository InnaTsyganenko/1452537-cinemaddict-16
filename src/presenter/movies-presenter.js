import MovieCardView from '../view/movie-card-view';
import PopupView from '../view/popup-view';
import {render, RenderPosition, remove, replace} from '../utils/render';

export default class MoviePresenter {
  #moviesContainer = null;
  #changeData = null;

  #movieCardComponent = null;
  #popupComponent = null;
  #siteFooterElement = null;

  #movie = null;

  constructor(moviesContainer, changeData) {
    this.#moviesContainer = moviesContainer;
    this.#changeData = changeData;
  }

  init = (movie) => {
    this.#movie = movie;

    const prevMovieCardComponent = this.#movieCardComponent;
    const prevPopupComponent = this.#popupComponent;

    this.#movieCardComponent = new MovieCardView(movie);
    this.#popupComponent = new PopupView(movie);

    this.#siteFooterElement = document.querySelector('.footer');

    this.#movieCardComponent.setMovieLinkClickHandler(this.#handleMovieLinkClick);
    this.#popupComponent.setClosePopupHandler(this.#handleClosePopupClick);

    this.#movieCardComponent.setMovieWatchlistClickHandler(this.#handleWatchlistClick);
    this.#movieCardComponent.setMovieWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCardComponent.setMovieFavoriteClickHandler(this.#handleFavoriteClick);

    this.#popupComponent.setMoviePopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setMoviePopupWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setMoviePopupFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevMovieCardComponent === null) {
      render(this.#moviesContainer, this.#movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieCardComponent !== prevMovieCardComponent) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }

    if (prevPopupComponent.element.parentElement !== null && this.#popupComponent !== prevPopupComponent) {
      replace(this.#popupComponent, prevPopupComponent);
    }
    remove(prevMovieCardComponent);
    remove(prevPopupComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleClosePopupClick();
    }
  }

  #handleClosePopupClick = () => {
    this.#popupComponent.reset();
    this.#popupComponent.element.remove();
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleMovieLinkClick = () => {
    if (this.#siteFooterElement.firstElementChild.classList.contains('film-details')) {
      this.#siteFooterElement.querySelector('.film-details__close-btn').click();
    }
    render(this.#siteFooterElement, this.#popupComponent.element, RenderPosition.AFTERBEGIN);
    this.#popupComponent.setClosePopupHandler(this.#handleClosePopupClick);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('body').classList.add('hide-overflow');
  };

  #handleWatchlistClick = () => {
    this.#movie.userDetails.isInWatchlist = !this.#movie.userDetails.isInWatchlist;
    return this.#changeData({...this.#movie});
  }

  #handleWatchedClick = () => {
    this.#movie.userDetails.isAlreadyWatched = !this.#movie.userDetails.isAlreadyWatched;
    return this.#changeData({...this.#movie});
  }

  #handleFavoriteClick = () => {
    this.#movie.userDetails.isInFavorite = !this.#movie.userDetails.isInFavorite;
    return this.#changeData({...this.#movie});
  }
}
