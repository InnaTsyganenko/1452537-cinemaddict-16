import MovieCardView from '../view/movie-card-view';
import PopupView from '../view/popup-view';
import {UserAction, UpdateType} from '../const.js';
import {render, RenderPosition, remove, replace} from '../utils/render';

export const State = {
  SAVING: 'SAVING',
  DELETING: 'DELETING',
  ABORTING: 'ABORTING',
};

export default class MoviePresenter {
  #moviesContainer = null;
  #changeData = null;

  #movieCardComponent = null;
  #popupComponent = null;
  #siteFooterElement = null;

  #movie = null;
  #scrollPos = 0;

  constructor(moviesContainer, changeData) {
    this.#moviesContainer = moviesContainer;
    this.#changeData = changeData;
  }

  init = (movie, scrollPos) => {
    this.#movie = movie;
    this.#scrollPos = scrollPos;

    const prevMovieCardComponent = this.#movieCardComponent;

    this.#movieCardComponent = new MovieCardView(movie);

    this.#siteFooterElement = document.querySelector('.footer');

    this.#movieCardComponent.setMovieLinkClickHandler(this.#handleMovieLinkClick);

    this.#movieCardComponent.setMovieWatchlistClickHandler(this.#handleWatchlistClick);
    this.#movieCardComponent.setMovieWatchedClickHandler(this.#handleWatchedClick);
    this.#movieCardComponent.setMovieFavoriteClickHandler(this.#handleFavoriteClick);

    if (prevMovieCardComponent === null) {
      render(this.#moviesContainer, this.#movieCardComponent, RenderPosition.BEFOREEND);
      return;
    }

    if (prevMovieCardComponent.element.parentElement !== null && this.#movieCardComponent !== prevMovieCardComponent) {
      replace(this.#movieCardComponent, prevMovieCardComponent);
    }
    this.#renderPopup();
    remove(prevMovieCardComponent);
  }

  setViewState = (state) => {
    if (document.querySelector('.film-details')) {
      this.#scrollPos = document.querySelector('.film-details').scrollTop;
    }
    const resetFormState = () => {
      if (this.#popupComponent) {
        this.#popupComponent.updateData({
          isDisabled: false,
          isDeleting: false,
        });
      }
    };

    switch (state) {
      case State.SAVING:
        if (this.#popupComponent !== null && this.#popupComponent.element.parentElement !== null) {
          this.#popupComponent.updateData({
            isDisabled: true,
          });
        }
        break;
      case State.DELETING:
        if (this.#popupComponent !== null && this.#popupComponent.element.parentElement !== null) {
          this.#popupComponent.updateData({
            isDisabled: true,
            isDeleting: true,
          });
        }
        break;
      case State.ABORTING:
        this.#movieCardComponent.shake(resetFormState);
        if (this.#popupComponent !== null && this.#popupComponent.element.parentElement !== null) {
          this.#popupComponent.shake(resetFormState);
        }
        break;
    }
    if (this.#popupComponent && this.#scrollPos > 0) {
      this.#popupComponent.element.scroll(0, this.#scrollPos);
    }
  }

  #escKeyDownHandler = (evt) => {
    if (evt.key === 'Escape' || evt.key === 'Esc') {
      evt.preventDefault();
      this.#handleClosePopupClick();
    }
  }

  #renderPopup = () => {
    if (this.#siteFooterElement.firstElementChild.classList.contains('film-details')) {
      this.#siteFooterElement.querySelector('.film-details__close-btn').click();
    }

    this.#popupComponent = new PopupView(this.#movie);

    this.#popupComponent.setClosePopupHandler(this.#handleClosePopupClick);
    this.#popupComponent.setMoviePopupWatchlistClickHandler(this.#handleWatchlistClick);
    this.#popupComponent.setMoviePopupWatchedClickHandler(this.#handleWatchedClick);
    this.#popupComponent.setMoviePopupFavoriteClickHandler(this.#handleFavoriteClick);
    this.#popupComponent.setPopupDeleteCommentHandler(this.#handleDeleteCommentClick);
    this.#popupComponent.setPopupAddCommentHandler(this.#handleAddCommentClick);

    render(this.#siteFooterElement, this.#popupComponent.element, RenderPosition.AFTERBEGIN);
    document.addEventListener('keydown', this.#escKeyDownHandler);
    document.querySelector('body').classList.add('hide-overflow');
    this.#popupComponent.element.scroll(0, this.#scrollPos);
  }

  #handleClosePopupClick = () => {
    this.#popupComponent.element.remove();
    document.querySelector('body').classList.remove('hide-overflow');
    document.removeEventListener('keydown', this.#escKeyDownHandler);
  }

  #handleMovieLinkClick = () => {
    this.#changeData(
      UserAction.GET_COMMENTS,
      UpdateType.PATCH,
      {...this.#movie});
  };

  #handleWatchlistClick = () => {
    this.#movie.userDetails.isInWatchlist = !this.#movie.userDetails.isInWatchlist;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie}
    );
  }

  #handleWatchedClick = () => {
    this.#movie.userDetails.isAlreadyWatched = !this.#movie.userDetails.isAlreadyWatched;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie}
    );
  }

  #handleFavoriteClick = () => {
    this.#movie.userDetails.isInFavorite = !this.#movie.userDetails.isInFavorite;
    this.#changeData(
      UserAction.UPDATE_MOVIE,
      UpdateType.MINOR,
      {...this.#movie}
    );
  }

  #handleDeleteCommentClick = (commentId) => {
    this.#changeData(
      UserAction.DELETE_COMMENT,
      UpdateType.PATCH,
      {...this.#movie, commentDel: commentId});
  }

  #handleAddCommentClick = (newComment) => {
    this.#changeData(
      UserAction.ADD_COMMENT,
      UpdateType.PATCH,
      {...this.#movie,
        commentsData: [newComment, ...this.#movie.commentsData],
        comments: [newComment.id, ...this.#movie.comments]
      });
  }
}
