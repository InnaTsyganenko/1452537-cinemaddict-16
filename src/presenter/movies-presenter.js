import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
import MoviesListTopRatedView from '../view/movies-top-rated-view';
import MoviesMostCommentedView from '../view/movies-most-commented-view';
import MoviePresenter, {State as MoviePresenterViewState} from '../presenter/movie-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import LoadingView from '../view/loading-view.js';
import NoMoviesView from '../view/no-movies-view';
import {MOVIE_COUNT_PER_STEP, FilterType, SortType, UpdateType, UserAction} from '../const';
import {render,  RenderPosition} from '../utils/render';
import {filter} from '../utils/filter.js';

export default class MoviesPresenter {
  #sortComponent = null;
  #mainContainer = null;
  #footerContainer = null;
  #moviesModel = null;
  #filterModel = null;
  #userInfoModel = null;
  #noMovieComponent = null;
  #moviesListTopRatedContainerComponent = null;
  #showMoreButtonComponent = null;
  #scrollPos = 0;
  #moviesTopRated = [];
  #moviesMostCommented = [];

  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesListContainerComponent = new MoviesListContainerView();
  #moviesTopRatedComponent = new MoviesListTopRatedView();
  #moviesMostCommentedComponent = new MoviesMostCommentedView();
  #loadingComponent = new LoadingView();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoadingMovies = true;

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #movieMainPresenter = new Map();
  #movieTopRatedPresenter = new Map();
  #movieMostCommentedPresenter = new Map();

  constructor(mainContainer, footerContainer, moviesModel, filterModel, userInfoModel) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#userInfoModel = userInfoModel;
  }

  get movies() {
    this.#moviesTopRated = [...this.#moviesModel.movies].sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, 2);
    this.#moviesMostCommented = [...this.#moviesModel.movies].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);

    this.#filterType = this.#filterModel.filter;
    const movies = [...this.#moviesModel.movies];
    this.#userInfoModel.setMovieCount(movies.filter((movie) => movie.userDetails.isAlreadyWatched === true).length);
    const filteredmovies = filter[this.#filterType](movies);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredmovies.sort((a, b) => (new Date(b.filmInfo.release.date)) - (new Date(a.filmInfo.release.date)));
      case SortType.RATING:
        return filteredmovies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
      default:
        return filteredmovies;
    }
  }

  init = () => {
    render(this.#mainContainer, this.#moviesSectionComponent, RenderPosition.BEFOREEND);
    render(this.#moviesSectionComponent, this.#moviesListComponent, RenderPosition.BEFOREEND);
    render(this.#moviesListComponent, this.#moviesListContainerComponent, RenderPosition.BEFOREEND);

    this.#renderMoviesSection();

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  destroy = () => {
    this.#clearMovieList({resetRenderedMovieCount: true, resetSort: true});
    this.#moviesSectionComponent.element.remove();
    this.#removeSort();

    this.#moviesModel.removeObserver(this.#handleModelEvent);
    this.#filterModel.removeObserver(this.#handleModelEvent);
  }

  #getComments = (updateType, update) => {
    try {
      this.#moviesModel.getMovieComments(updateType, update);
    } catch(err) {
      if (this.#movieMainPresenter.has(update.id)) {
        this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
      }

      if (this.#movieTopRatedPresenter.has(update.id)) {
        this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
      }

      if (this.#movieMostCommentedPresenter.has(update.id)) {
        this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
      }
    }
  }

  #handleViewAction = async (actionType, updateType, update) => {
    if (this.#footerContainer.querySelector('.film-details')) {
      this.#scrollPos = this.#footerContainer.querySelector('.film-details').scrollTop;
    }

    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        if (this.#footerContainer.querySelector('.film-details')) {
          this.#getComments(updateType, update);
        }
        try {
          await this.#moviesModel.updateMovie(updateType, update);
        } catch(err) {
          if (this.#movieMainPresenter.has(update.id)) {
            this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieTopRatedPresenter.has(update.id)) {
            this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieMostCommentedPresenter.has(update.id)) {
            this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }
        }
        break;
      case UserAction.GET_COMMENTS:
        this.#scrollPos = 0;

        if (this.#movieMainPresenter.has(update.id)) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }

        if (this.#movieTopRatedPresenter.has(update.id)) {
          this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }

        if (this.#movieMostCommentedPresenter.has(update.id)) {
          this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }

        this.#getComments(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        if (this.#movieMainPresenter.has(update.id)) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }

        if (this.#movieTopRatedPresenter.has(update.id)) {
          this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }

        if (this.#movieMostCommentedPresenter.has(update.id)) {
          this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        }
        this.#scrollPos = this.#footerContainer.querySelector('.film-details__bottom-container').offsetTop;
        try {
          await this.#moviesModel.addComment(updateType, update);
          this.#moviesModel.updateMoviesMostCommented(update);
          this.#moviesMostCommented = [...this.#moviesModel.movies].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
          this.#renderMostCommentedBlockMovies(this.#moviesMostCommented);
        } catch(err) {
          if (this.#movieMainPresenter.has(update.id)) {
            this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieTopRatedPresenter.has(update.id)) {
            this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieMostCommentedPresenter.has(update.id)) {
            this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }
        }
        break;
      case UserAction.DELETE_COMMENT:
        if (this.#movieMainPresenter.has(update.id)) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.DELETING);
        }

        if (this.#movieTopRatedPresenter.has(update.id)) {
          this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.DELETING);
        }

        if (this.#movieMostCommentedPresenter.has(update.id)) {
          this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.DELETING);
        }
        try {
          await this.#moviesModel.deleteComment(updateType, update);
          this.#moviesModel.updateMoviesMostCommented(update);
          this.#moviesMostCommented = [...this.#moviesModel.movies].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
          this.#renderMostCommentedBlockMovies(this.#moviesMostCommented);
        } catch(err) {
          if (this.#movieMainPresenter.has(update.id)) {
            this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieTopRatedPresenter.has(update.id)) {
            this.#movieTopRatedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }

          if (this.#movieMostCommentedPresenter.has(update.id)) {
            this.#movieMostCommentedPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        if (this.#movieMainPresenter.has(data.id)) {
          this.#movieMainPresenter.get(data.id).init(data, this.#scrollPos);
        }

        if (this.#movieTopRatedPresenter.has(data.id)) {
          this.#movieTopRatedPresenter.get(data.id).init(data, this.#scrollPos);
        }

        if (this.#movieMostCommentedPresenter.has(data.id)) {
          this.#movieMostCommentedPresenter.get(data.id).init(data, this.#scrollPos);
        }

        break;
      case UpdateType.MINOR:
        this.#clearMovieList();
        this.#renderMoviesSection();
        if (this.#footerContainer.querySelector('.film-details') && this.#footerContainer.querySelector('.film-details').id === data.id) {
          if (this.#movieMainPresenter.has(data.id)) {
            this.#movieMainPresenter.get(data.id).init(data, this.#scrollPos);
          }

          if (this.#movieTopRatedPresenter.has(data.id)) {
            this.#movieTopRatedPresenter.get(data.id).init(data, this.#scrollPos);
          }

          if (this.#movieMostCommentedPresenter.has(data.id)) {
            this.#movieMostCommentedPresenter.get(data.id).init(data, this.#scrollPos);
          }
        }
        break;
      case UpdateType.MAJOR:
        this.#clearMovieList({resetRenderedMovieCount: true, resetSort: true});
        this.#renderMoviesSection();
        break;
      case UpdateType.INIT:
        this.#isLoadingMovies = false;
        this.#loadingComponent.element.remove();
        this.#renderMoviesSection();
        break;
    }
  }

  #removeSort = () => {
    if (this.#sortComponent === null) {
      return;
    }
    this.#sortComponent.element.remove();
  }

  #clearMovieList = ({resetRenderedMovieCount = false, resetSort = false} = {}) => {
    const movieCount = this.movies.length;

    if (this.#noMovieComponent) {
      this.#noMovieComponent.element.remove();
    }

    if (resetRenderedMovieCount) {
      this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    } else {
      this.#renderedMovieCount = Math.min(movieCount, this.#renderedMovieCount);
    }

    if (resetSort) {
      if (this.#mainContainer.querySelector('.sort__button')) {
        this.#mainContainer.querySelector('.sort__button').click();
      }
    }

    while (this.#moviesSectionComponent.element.querySelector('.films-list__container').firstChild) {
      this.#moviesSectionComponent.element.querySelector('.films-list__container').removeChild(this.#moviesSectionComponent.element.querySelector('.films-list__container').lastChild);
    }

    this.#loadingComponent.element.remove();

    if (this.#showMoreButtonComponent) {
      this.#showMoreButtonComponent.element.remove();
    }

    this.#movieMainPresenter.clear();
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearMovieList({resetRenderedMovieCount: true});
    this.#renderMainBlockMovies();
  }

  #handleShowMoreButtonClick = () => {
    this.movies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => this.#renderMovieCardMain(this.#moviesListContainerComponent, movie));
    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;
    if (this.#renderedMovieCount >= this.movies.length) {
      this.#showMoreButtonComponent.element.remove();
    }
  }

  #renderSort = () => {
    this.#sortComponent = new SortView(this.#currentSortType);
    render(this.#moviesSectionComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCardMain = (container, movie) => {
    const movieMainPresenter = new MoviePresenter(container, this.#handleViewAction);
    movieMainPresenter.init(movie);
    this.#movieMainPresenter.set(movie.id, movieMainPresenter);
  }

  #renderMovieCardTopRated = (container, movie) => {
    const movieTopRatedPresenter = new MoviePresenter(container, this.#handleViewAction);
    movieTopRatedPresenter.init(movie);
    this.#movieTopRatedPresenter.set(movie.id, movieTopRatedPresenter);
  }

  #renderMovieCardMostCommented = (container, movie) => {
    const movieMostCommentedPresenter = new MoviePresenter(container, this.#handleViewAction);
    movieMostCommentedPresenter.init(movie);
    this.#movieMostCommentedPresenter.set(movie.id, movieMostCommentedPresenter);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    render(this.#moviesListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#showMoreButtonComponent.setShowMoreButtonClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderMainBlockMovies = () => {
    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount <= 1) {
      this.#removeSort();
      if (movieCount === 0) {
        this.#renderNoMovies();
        return;
      }
    }

    if (movieCount > 1 && this.#mainContainer.querySelector('.sort') === null) {
      this.#renderSort(this.#currentSortType);
    }

    movies.slice(0, this.#renderedMovieCount).forEach((movie) => this.#renderMovieCardMain(this.#moviesListContainerComponent, movie));

    if (movieCount > this.#renderedMovieCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopRatedBlockMovies = (moviesTopRated) => {
    if (this.#moviesTopRatedComponent && this.#moviesTopRatedComponent.element.querySelector('.films-list__container').hasChildNodes()) {
      while (this.#moviesTopRatedComponent.element.querySelector('.films-list__container').firstChild) {
        this.#moviesTopRatedComponent.element.querySelector('.films-list__container').removeChild(this.#moviesTopRatedComponent.element.querySelector('.films-list__container').lastChild);
      }
      this.#moviesMostCommentedComponent.element.remove();
      this.#movieTopRatedPresenter.clear();
    }

    render(this.#moviesSectionComponent, this.#moviesTopRatedComponent, RenderPosition.BEFOREEND);
    moviesTopRated.forEach((movie) => this.#renderMovieCardTopRated(this.#moviesTopRatedComponent.element.querySelector('.films-list__container'), movie));
  }

  #renderMostCommentedBlockMovies = (moviesMostCommented) => {
    if (this.#moviesMostCommentedComponent && this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').hasChildNodes()) {
      while (this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').firstChild) {
        this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').removeChild(this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').lastChild);
      }
      this.#moviesMostCommentedComponent.element.remove();
      this.#movieMostCommentedPresenter.clear();
    }

    render(this.#moviesSectionComponent, this.#moviesMostCommentedComponent, RenderPosition.BEFOREEND);

    moviesMostCommented.forEach((movie) => this.#renderMovieCardMostCommented(this.#moviesMostCommentedComponent.element.querySelector('.films-list__container'), movie));
  }

  #renderLoading = () => {
    render(this.#moviesSectionComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoMovies = () => {
    this.#noMovieComponent = new NoMoviesView(this.#filterType);
    render(this.#moviesListContainerComponent, this.#noMovieComponent, RenderPosition.BEFOREEND);
  }

  #renderMoviesSection = () => {
    if (this.#isLoadingMovies) {
      this.#renderLoading();
      return;
    }

    this.#renderMainBlockMovies();

    const isAllMovieRatingNull = this.movies.every((movie) => movie.filmInfo.totalRating !== 0);
    const isAllMovieNoComments = this.movies.every((movie) => movie.comments.length !== 0);

    if (isAllMovieRatingNull) {
      this.#renderTopRatedBlockMovies(this.#moviesTopRated);
    }

    if (isAllMovieNoComments) {
      this.#renderMostCommentedBlockMovies(this.#moviesMostCommented);
    }
  }
}
