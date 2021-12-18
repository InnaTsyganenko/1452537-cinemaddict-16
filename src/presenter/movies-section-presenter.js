import MoviesSectionView from '../view/movies-section-view';
import MoviesListView from '../view/movies-list-view';
import MoviesListContainerView from '../view/movies-list-container-view';
import MoviePresenter from './movie-presenter';
import ShowMoreButtonView from '../view/show-more-button-view';
import MoviesExtraBlocksView from '../view/movies-extra-blocks-view';
import NoMovieView from '../view/no-movies-view';
import {MOVIE_COUNT_PER_STEP, TITLES_FOR_EXTRA_BLOCKS} from '../const';
import {render,  RenderPosition, updateItem} from '../utils/render';

export default class MoviesSectionPresenter {
  #mainContainer = null;
  #moviesSectionComponent = new MoviesSectionView();
  #moviesListComponent = new MoviesListView();
  #moviesListContainerComponent = new MoviesListContainerView();
  #noMoviesComponent = new NoMovieView();
  #showMoreButtonComponent = new ShowMoreButtonView();

  #movies = [];
  #renderedMovieCount = MOVIE_COUNT_PER_STEP;
  #moviePresenter = new Map();

  constructor(mainContainer) {
    this.#mainContainer = mainContainer;
  }

  init = (movies) => {
    this.#movies = [...movies];

    render(this.#mainContainer, this.#moviesSectionComponent, RenderPosition.BEFOREEND);
    render(this.#moviesSectionComponent, this.#moviesListComponent, RenderPosition.AFTERBEGIN);
    render(this.#moviesListComponent, this.#moviesListContainerComponent, RenderPosition.BEFOREEND);

    this.#renderMoviesSection();
  }

  #handleMovieChange = (updatedMovie) => {
    this.#movies = updateItem(this.#movies, updatedMovie);
    this.#moviePresenter.get(updatedMovie.id).init(updatedMovie);
  }

  #handleShowMoreButtonClick = () => {
    this.#movies.slice(this.#renderedMovieCount, this.#renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => this.#renderMovieCard(this.#moviesListContainerComponent, movie));
    this.#renderedMovieCount += MOVIE_COUNT_PER_STEP;
    if (this.#renderedMovieCount >= this.#movies.length) {
      this.#showMoreButtonComponent.element.remove();
    }
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
    this.#renderMainBlockMovies();
    this.#renderExtraBlocks();
  }
}
