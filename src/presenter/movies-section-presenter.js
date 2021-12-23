import MainNavView from '../view/main-nav-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
import MoviePresenter from '../presenter/movies-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import NoMovieView from '../view/no-movies-view';
import NumberOfFilmsView from '../view/number-of-films-view';
import {MOVIE_COUNT_PER_STEP, FilterType, SortType} from '../const';
import {render,  RenderPosition, updateItem} from '../utils/render';

export default class MoviesSectionPresenter {
  #sortComponent = null;
  #mainContainer = null;
  #footerContainer = null;

  #mainNavComponent = new MainNavView();
  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesListContainerComponent = new MoviesListContainerView();
  #noMoviesComponent = new NoMovieView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #movies = [];
  #currentFilterType = FilterType.ALL;
  #currentSortType = SortType.DEFAULT;
  #sourcedMovies = [];
  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #moviesMainPresenter = new Map();

  constructor(mainContainer, footerContainer) {
    this.#mainContainer = mainContainer;
    this.#footerContainer = footerContainer;
  }

  init = (movies) => {
    this.#movies = [...movies];
    this.#sourcedMovies = [...movies];

    render(this.#mainContainer, this.#moviesSectionComponent, RenderPosition.BEFOREEND);
    render(this.#moviesSectionComponent, this.#moviesListComponent, RenderPosition.AFTERBEGIN);
    render(this.#moviesListComponent, this.#moviesListContainerComponent, RenderPosition.BEFOREEND);

    render(this.#footerContainer, new NumberOfFilmsView(movies.length), RenderPosition.BEFOREEND);

    this.#renderMoviesSection();
  }

  #handleMovieChange = (updatedMovie) => {
    this.#movies = updateItem(this.#movies, updatedMovie);
    this.#sourcedMovies = updateItem(this.#sourcedMovies, updatedMovie);
    this.#moviesMainPresenter.get(updatedMovie.id).init(updatedMovie);
  }

  #closeOpenedPopup = () => {
    if (this.#footerContainer.firstElementChild.classList.contains('film-details')) {
      this.#footerContainer.querySelector('.film-details__close-btn').click();
    }
  }

  #clearFilter = () => {
    this.#mainNavComponent.element.removeChild(this.#mainNavComponent.element.querySelector('.main-navigation__items'));
  }

  #clearSort = () => {
    this.#mainContainer.removeChild(this.#mainContainer.querySelector('.sort'));
  }

  #clearMovieList = () => {
    while (this.#moviesListContainerComponent.element.firstChild) {
      this.#moviesListContainerComponent.element.removeChild(this.#moviesListContainerComponent.element.lastChild);
    }
    this.#renderedMovieCount = MOVIE_COUNT_PER_STEP;
    this.#showMoreButtonComponent.element.remove();
  }

  #filterMovies = (filterType) => {
    switch (filterType) {
      case FilterType.WATCHLIST:
        this.#movies = [...this.#sourcedMovies];
        this.#movies = this.#movies.filter((movie) => movie.userDetails.isInWatchlist);
        break;
      case FilterType.HISTORY:
        this.#movies = [...this.#sourcedMovies];
        this.#movies = this.#movies.filter((movie) => movie.userDetails.isAlreadyWatched);
        break;
      case FilterType.FAVORITES:
        this.#movies = [...this.#sourcedMovies];
        this.#movies = this.#movies.filter((movie) => movie.userDetails.isInFavorite);
        break;
      default:
        this.#movies = [...this.#sourcedMovies];
    }
    this.#currentFilterType = filterType;
  }

  #handleFilterChange = (filterType) => {
    if (this.#currentFilterType === filterType) {
      return;
    }
    if (this.#footerContainer.firstElementChild.classList.contains('film-details')) {
      this.#footerContainer.querySelector('.film-details__close-btn').click();
    }
    this.#filterMovies(filterType);
    this.#clearFilter(filterType);
    this.#renderFilters(this.#mainNavComponent.element, filterType);
    this.#clearMovieList();
    this.#renderMainBlockMovies();
  }

  #sortMovies = (sortType) => {
    switch (sortType) {
      case SortType.DATE:
        this.#movies.sort((a, b) => b.filmInfo.release.date - a.filmInfo.release.date);
        break;
      case SortType.RATING:
        this.#movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating);
        break;
      default:
        this.#movies = [...this.#sourcedMovies];
    }

    this.#currentSortType = sortType;
  }

  #handleSortTypeChange = (sortType) => {
    if (this.#currentSortType === sortType) {
      this.#closeOpenedPopup();
      return;
    }
    this.#sortMovies(sortType);
    this.#closeOpenedPopup();
    this.#clearSort();
    this.#renderSort(sortType);
    this.#clearMovieList();
    this.#renderMainBlockMovies();
  }

  #handleShowMoreButtonClick = () => {
    this.#movies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));
    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;
    if (this.#renderedMovieCount >= this.#movies.length) {
      this.#showMoreButtonComponent.element.remove();
    }
  }

  #renderMainNav = () => {
    render(this.#mainContainer, this.#mainNavComponent, RenderPosition.AFTERBEGIN);
    this.#renderFilters(this.#mainNavComponent.element, this.#currentFilterType);
  }

  #renderFilters = (container, filterType) => {
    const filterComponent = new FilterView(this.#sourcedMovies, filterType);
    render(container, filterComponent, RenderPosition.AFTERBEGIN);
    filterComponent.setFilterTypeChangeHandler(this.#handleFilterChange);
  }

  #renderSort = (sortType) => {
    this.#sortComponent = new SortView(sortType);
    render(this.#moviesSectionComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCard = (container, movie) => {
    const moviesMainPresenter = new MoviePresenter(container, this.#handleMovieChange);
    moviesMainPresenter.init(movie);
    this.#moviesMainPresenter.set(movie.id, moviesMainPresenter);
  }

  #renderShowMoreButton = () => {
    this.#movies.slice(0, this.#renderedMovieCount).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));
    render(this.#moviesListComponent, this.#showMoreButtonComponent, RenderPosition.BEFOREEND);
    this.#showMoreButtonComponent.setClickHandler(this.#handleShowMoreButtonClick);
  }

  #renderMainBlockMovies = () => {
    if (this.#movies.length === 0) {
      this.#renderNoMovies();
    } else {
      if (this.#movies.length > MOVIE_COUNT_PER_STEP) {
        this.#renderShowMoreButton();
      } else {
        this.#movies.forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));
      }
    }
  }

  #renderNoMovies = () => {
    render(this.#moviesListContainerComponent, this.#noMoviesComponent, RenderPosition.BEFOREEND);
  }

  #renderMoviesSection = () => {
    this.#renderMainNav();
    this.#renderSort(this.#currentSortType);
    this.#renderMainBlockMovies();
  }
}
