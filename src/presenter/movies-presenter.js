import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesMainView from '../view/movies-main-view';
import MoviesTopRatedView from '../view/movies-top-rated-view';
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
  #moviesMainContainer = null;
  #footerContainer = null;
  #moviesModel = null;
  #filterModel = null;
  #userInfoModel = null;
  #noMovieComponent = null;
  #showMoreButtonComponent = null;
  #scrollPos = 0;
  #moviesTopRated = [];
  #moviesMostCommented = [];

  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesMainView();
  #moviesTopRatedComponent = new MoviesTopRatedView();
  #moviesMostCommentedComponent = new MoviesMostCommentedView();
  #loadingComponent = new LoadingView();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;
  #isLoadingMovies = true;

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #movieMainPresenter = new Map();

  constructor(mainContainer, footerContainer, moviesModel, filterModel, userInfoModel) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;
    this.#userInfoModel = userInfoModel;

    this.#moviesMainContainer = this.#moviesListComponent.element.querySelector('.films-list__container');
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
      this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
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
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
        }
        break;
      case UserAction.GET_COMMENTS:
        this.#scrollPos = 0;
        this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        this.#getComments(updateType, update);
        break;
      case UserAction.ADD_COMMENT:
        this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        this.#scrollPos = this.#footerContainer.querySelector('.film-details__bottom-container').offsetTop;
        try {
          await this.#moviesModel.addComment(updateType, update);
        } catch(err) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
        }
        break;
      case UserAction.DELETE_COMMENT:
        this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.DELETING);
        try {
          await this.#moviesModel.deleteComment(updateType, update);
        } catch(err) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
        }
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#movieMainPresenter.get(data.id).init(data, this.#scrollPos);
        break;
      case UpdateType.MINOR:
        if (this.#footerContainer.querySelector('.film-details') && this.#footerContainer.querySelector('.film-details').id === data.id) {
          this.#movieMainPresenter.get(data.id).init(data, this.#scrollPos);
        }

        this.#clearMovieList();

        this.#moviesModel.updateMoviesMostCommented(data);
        this.#moviesMostCommented = [...this.#moviesModel.movies].sort((a, b) => b.comments.length - a.comments.length).slice(0, 2);
        this.#renderMoviesSection();
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
    if (this.#noMovieComponent) {
      this.#noMovieComponent.element.remove();
    }

    if (resetRenderedMovieCount) {
      this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    }

    if (resetSort) {
      if (this.#mainContainer.querySelector('.sort__button')) {
        this.#mainContainer.querySelector('.sort__button').click();
      }
    }

    this.#moviesSectionComponent.element.querySelectorAll('.films-list__container').forEach((container) => {
      while (container.firstChild) {
        container.removeChild(container.lastChild);
      }
    });

    this.#loadingComponent.element.remove();

    if (this.#showMoreButtonComponent) {
      this.#showMoreButtonComponent.element.remove();
    }
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearMovieList({resetRenderedMovieCount: true});
    this.#renderMoviesSection();
  }

  #handleShowMoreButtonClick = () => {
    this.movies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => this.#renderMovieCardMain(this.#moviesMainContainer, movie));
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

    movies.slice(0, this.#renderedMovieCount).forEach((movie) => this.#renderMovieCardMain(this.#moviesMainContainer, movie));

    if (movieCount > this.#renderedMovieCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderTopRatedBlockMovies = (moviesTopRated) => {
    render(this.#moviesSectionComponent, this.#moviesTopRatedComponent, RenderPosition.BEFOREEND);
    moviesTopRated.forEach((movie) => this.#renderMovieCardMain(this.#moviesTopRatedComponent.element.querySelector('.films-list__container'), movie));
  }

  #renderMostCommentedBlockMovies = () => {
    if (this.#moviesMostCommentedComponent && this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').hasChildNodes()) {
      while (this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').firstChild) {
        this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').removeChild(this.#moviesMostCommentedComponent.element.querySelector('.films-list__container').lastChild);
      }
      this.#moviesMostCommentedComponent.element.remove();
    }

    render(this.#moviesSectionComponent, this.#moviesMostCommentedComponent, RenderPosition.BEFOREEND);
    this.#moviesMostCommented.forEach((movie) => this.#renderMovieCardMain(this.#moviesMostCommentedComponent.element.querySelector('.films-list__container'), movie));
  }

  #renderLoading = () => {
    render(this.#moviesSectionComponent, this.#loadingComponent, RenderPosition.AFTERBEGIN);
  }

  #renderNoMovies = () => {
    this.#noMovieComponent = new NoMoviesView(this.#filterType);
    render(this.#moviesMainContainer, this.#noMovieComponent, RenderPosition.BEFOREEND);
  }

  #renderMoviesSection = () => {
    if (this.#isLoadingMovies) {
      this.#renderLoading();
      return;
    }

    this.#renderMainBlockMovies();

    const isAllMovieRatingNull = [...this.#moviesModel.movies].every((movie) => movie.filmInfo.totalRating !== 0);
    const isAllMovieNoComments = [...this.#moviesModel.movies].every((movie) => movie.comments.length !== 0);

    if (isAllMovieRatingNull) {
      this.#renderTopRatedBlockMovies(this.#moviesTopRated);
    }

    if (isAllMovieNoComments) {
      this.#renderMostCommentedBlockMovies(this.#moviesMostCommented);
    }
  }
}
