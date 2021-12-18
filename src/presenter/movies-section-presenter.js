import MainNavView from '../view/main-nav-view';
import FilterView from '../view/filter-view';
import SortView from '../view/sort-view';
import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
import MoviePresenter from '../presenter/movies-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesExtraBlocksView from '../view/movies-extra-blocks-view';
import NoMovieView from '../view/no-movies-view';
import NumberOfFilmsView from '../view/number-of-films-view';
import {MOVIE_COUNT_PER_STEP, TITLES_FOR_EXTRA_BLOCKS, FILTERS_VALUES, FilterType, SortType} from '../const';
import {render,  RenderPosition, updateItem} from '../utils/render';

export default class MoviesSectionPresenter {
  #mainContainer = null;
  #footerContainer = null;

  #mainNavComponent = new MainNavView();
  #sortComponent = new SortView();
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
  #moviePresenter = new Map();

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
    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie);
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
      return;
    }
    this.#sortMovies(sortType);
    if (this.#footerContainer.firstElementChild.classList.contains('film-details')) {
      this.#footerContainer.querySelector('.film-details__close-btn').click();
    }
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
    this.#renderFilters(this.#mainNavComponent.element);
  }

  #renderFilters = (container) => {
    const filterComponent = new FilterView(this.#sourcedMovies, FILTERS_VALUES[0]);
    render(container, filterComponent, RenderPosition.AFTERBEGIN);
    filterComponent.setFilterTypeChangeHandler(this.#handleFilterChange);
  }

  #renderSort = () => {
    render(this.#moviesSectionComponent, this.#sortComponent, RenderPosition.BEFOREBEGIN);
    this.#sortComponent.setSortTypeChangeHandler(this.#handleSortTypeChange);
  }

  #renderMovieCard = (container, movie) => {
    const moviePresenter = new MoviePresenter(container, this.#handleMovieChange);
    moviePresenter.init(movie);
    this.#moviePresenter.set(movie.id, moviePresenter);
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

  #renderExtraBlocks = () => {
    const isNullMoviesRating = this.#movies.every((movie) => movie.filmInfo.totalRating === 0);
    const isNullMoviesComments = this.#movies.every((movie) => movie.comments.length === 0);

    const topRatedMovies = this.#movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0,2);
    const mostCommentsMovies = this.#movies.sort((a, b) => b.comments.length - a.comments.length).slice(0,2);

    if (isNullMoviesRating && isNullMoviesComments) {
      TITLES_FOR_EXTRA_BLOCKS.splice(0, 2);
    } else if (isNullMoviesRating) {
      TITLES_FOR_EXTRA_BLOCKS.splice(0, 1);
    } else if (isNullMoviesComments) {
      TITLES_FOR_EXTRA_BLOCKS.splice(1, 1);
    }

    TITLES_FOR_EXTRA_BLOCKS.forEach((title) => {
      render(this.#moviesSectionComponent.element, new MoviesExtraBlocksView(title), RenderPosition.BEFOREEND);
    });

    const moviesTopRatedElement = this.#moviesSectionComponent.element.querySelector('.films-list--extra');
    const moviesMostCommentedElement = this.#moviesSectionComponent.element.querySelector('.films-list--extra:last-of-type');

    if (moviesTopRatedElement && moviesTopRatedElement.querySelector('.films-list__title').textContent === 'Top rated') {
      topRatedMovies.forEach((movie) => this.#renderMovieCard(moviesTopRatedElement.querySelector('.films-list__container'), movie));
    }

    if (moviesMostCommentedElement && moviesMostCommentedElement.querySelector('.films-list__title').textContent === 'Most commented') {
      mostCommentsMovies.forEach((movie) => this.#renderMovieCard(moviesMostCommentedElement.querySelector('.films-list__container'), movie));
    }
  }

  #renderNoMovies = () => {
    render(this.#moviesListContainerComponent, this.#noMoviesComponent, RenderPosition.BEFOREEND);
  }

  #renderMoviesSection = () => {
    this.#renderMainNav();
    this.#renderSort();
    this.#renderMainBlockMovies();
    this.#renderExtraBlocks();
  }
}
