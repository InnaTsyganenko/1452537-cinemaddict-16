import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
import MoviePresenter from '../presenter/movies-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import NoMovieView from '../view/no-movies-view';
import NumberOfFilmsView from '../view/number-of-films-view';
import {MOVIE_COUNT_PER_STEP, FilterType, SortType, UpdateType, UserAction} from '../const';
import {render,  RenderPosition} from '../utils/render';
import {filter} from '../utils/filter.js';

export default class MoviesSectionPresenter {
  #sortComponent = null;
  #mainContainer = null;
  #footerContainer = null;
  #moviesModel = null;
  #showMoreButtonComponent = null;
  #filterModel = null;
  #noMovieComponent = null;

  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesListContainerComponent = new MoviesListContainerView();

  #currentSortType = SortType.DEFAULT;
  #filterType = FilterType.ALL;

  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #moviesMainPresenter = new Map();

  constructor(mainContainer, footerContainer, moviesModel, filterModel) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
    this.#moviesModel = moviesModel;
    this.#filterModel = filterModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#filterModel.addObserver(this.#handleModelEvent);
  }

  get movies() {
    this.#filterType = this.#filterModel.filter;
    const movies = [...this.#moviesModel.movies];
    const filteredmovies = filter[this.#filterType](movies);
    switch (this.#currentSortType) {
      case SortType.DATE:
        return filteredmovies.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
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

    render(this.#footerContainer, new NumberOfFilmsView(this.#moviesModel.movies.length), RenderPosition.BEFOREEND);

    this.#renderMoviesSection();
  }

  #handleViewAction = (actionType, updateType, update) => {
    switch (actionType) {
      case UserAction.UPDATE_MOVIE:
        this.#moviesModel.updateMovie(updateType, update);
        break;
    }
  }

  #handleModelEvent = (updateType, data) => {
    switch (updateType) {
      case UpdateType.PATCH:
        this.#moviesMainPresenter.get(data.id).init(data);
        break;
      case UpdateType.MINOR:
        this.#clearMovieList();
        this.#moviesMainPresenter.get(data.id).init(data);
        this.#renderMainBlockMovies();
        break;
      case UpdateType.MAJOR:
        this.#closeOpenedPopup();
        this.#clearMovieList({resetRenderedMovieCount: true, resetSortType: true});
        this.#renderMainBlockMovies();
        this.#mainContainer.querySelector('.sort__button').click();
        break;
    }
  }

  #closeOpenedPopup = () => {
    if (this.#footerContainer.firstElementChild.classList.contains('film-details')) {
      this.#footerContainer.querySelector('.film-details__close-btn').click();
    }
  }

  #clearMovieList = ({resetRenderedMovieCount = false} = {}) => {
    const movieCount = this.movies.length;

    if (this.#noMovieComponent) {
      this.#noMovieComponent.element.remove();
    }

    if (resetRenderedMovieCount) {
      this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    } else {
      this.#renderedMovieCount = Math.min(movieCount, this.#renderedMovieCount);
    }

    while (this.#moviesListContainerComponent.element.firstChild) {
      this.#moviesListContainerComponent.element.removeChild(this.#moviesListContainerComponent.element.lastChild);
    }
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    if (this.#showMoreButtonComponent) {
      this.#showMoreButtonComponent.element.remove();
    }
  }

  #handleSortTypeChange = (sortType) => {
    this.#closeOpenedPopup();
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
    const moviesMainPresenter = new MoviePresenter(container, this.#handleViewAction);
    moviesMainPresenter.init(movie);
    this.#moviesMainPresenter.set(movie.id, moviesMainPresenter);
  }

  #renderShowMoreButton = () => {
    this.#showMoreButtonComponent = new ShowMoreButtonView();
    render(this.#moviesListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderMainBlockMovies = () => {
    const movies = this.movies;
    const movieCount = movies.length;

    if (movieCount === 0) {
      this.#renderNoMovies();
      return;
    }

    this.movies.slice(0, this.#renderedMovieCount).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));

    if (movieCount > this.#renderedMovieCount) {
      this.#renderShowMoreButton();
    }
  }

  #renderNoMovies = () => {
    this.#noMovieComponent = new NoMovieView(this.#filterType);
    render(this.#moviesListContainerComponent, this.#noMovieComponent, RenderPosition.BEFOREEND);
  }

  #renderMoviesSection = () => {
    this.#renderSort(this.#currentSortType);
    this.#renderMainBlockMovies();
  }
}
