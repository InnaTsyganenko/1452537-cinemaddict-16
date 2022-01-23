import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
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
  #showMoreButtonComponent = null;
  #scrollPos = 0;

  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesListContainerComponent = new MoviesListContainerView();
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
  }

  get movies() {
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
    render(this.#moviesSectionComponent, this.#moviesListComponent, RenderPosition.AFTERBEGIN);
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

  #handleViewAction = async (actionType, updateType, update) => {
    if (this.#footerContainer.querySelector('.film-details')) {
      this.#scrollPos = this.#footerContainer.querySelector('.film-details').scrollTop;
    }

    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        if (this.#footerContainer.querySelector('.film-details')) {
          try {
            await this.#moviesModel.updateMovieComments(updateType, update);
          } catch(err) {
            this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
          }
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
        try {
          await this.#moviesModel.updateMovieComments(updateType, update);
        } catch(err) {
          this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.ABORTING);
        }
        break;
      case UserAction.ADD_COMMENT:
        this.#movieMainPresenter.get(update.id).setViewState(MoviePresenterViewState.SAVING);
        this.#scrollPos = this.#footerContainer.querySelector('.film-details').scrollHeight;
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
        this.#clearMovieList();
        this.#renderMainBlockMovies();
        if (this.#footerContainer.querySelector('.film-details') && this.#footerContainer.querySelector('.film-details').id === data.id) {
          this.#movieMainPresenter.get(data.id).init(data, this.#scrollPos);
        }
        break;
      case UpdateType.MAJOR:
        this.#clearMovieList({resetRenderedMovieCount: true, resetSort: true});
        this.#renderMainBlockMovies();
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

    while (this.#moviesListContainerComponent.element.firstChild) {
      this.#moviesListContainerComponent.element.removeChild(this.#moviesListContainerComponent.element.lastChild);
    }

    this.#loadingComponent.element.remove();

    if (this.#showMoreButtonComponent) {
      this.#showMoreButtonComponent.element.remove();
    }
  }

  #handleSortTypeChange = (sortType) => {
    this.#currentSortType = sortType;
    this.#clearMovieList({resetRenderedMovieCount: true});
    this.#renderMainBlockMovies();
  }

  #handleShowMoreButtonClick = () => {
    this.movies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));
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

  #renderMovieCard = (container, movie) => {
    const movieMainPresenter = new MoviePresenter(container, this.#handleViewAction, movie.id);
    movieMainPresenter.init(movie);
    this.#movieMainPresenter.set(movie.id, movieMainPresenter);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    render(this.#moviesListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
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

    if (movieCount > 1 && document.querySelector('.sort') === null) {
      this.#renderSort(this.#currentSortType);
    }

    movies.slice(0, this.#renderedMovieCount).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));

    if (movieCount > this.#renderedMovieCount) {
      this.#renderShowMoreButton();
    }
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
  }
}
