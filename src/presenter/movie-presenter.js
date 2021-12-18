import MovieCardView from '../view/movie-card-view';
import PopupView from '../view/popup-view';
import {render,  RenderPosition, remove, replace} from '../utils/render';

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

    this.#movieCardComponent = new MovieCardView(movie);
    this.#popupComponent = new PopupView(movie);

    this.#siteFooterElement = document.querySelector('.footer');

    this.#movieCardComponent.setMovieLinkClickHandler(this.#handleMovieLinkClick);
    this.#popupComponent.setClosePopupHandler(this.#handleClosePopupClick);

    this.#movieCardComponent.setMovieWatchlistClickHandler(this.#handleWatchlistClick);
    this.#movieCardComponent.setMovieWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCardComponent.setMovieFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevMovieCardComponent === null) {
      render(this.#moviesContainer, this.#movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (this.#movieCardComponent !== prevMovieCardComponent) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }
    remove(prevMovieCardComponent);
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#popupComponent.element.remove();
    }
  }

  #handleClosePopupClick = () => {
    this.#popupComponent.element.remove();
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleMovieLinkClick = () => {
    if (this.#siteFooterElement.firstElementChild.classList.contains('film-details')) {
      this.#siteFooterElement.querySelector('.film-details__close-btn').click();
    }
    this.#siteFooterElement.prepend(this.#popupComponent.element);
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
