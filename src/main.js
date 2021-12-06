import MoviesSectionView from './view/movies-section-view';
import UserInfoView from './view/user-info-view';
import FilterAndStatsView from './view/filter-and-stats-view';
import SortView from './view/sort-view';
import MovieCardView from './view/movie-card-view';
import MoviesExtraBlocksView from './view/movies-extra-blocks-view';
import PopupView from './view/popup-view';
import ShowMoreButtonView from './view/show-more-button-view';
import NumberOfFilmsView from './view/number-of-films-view';
import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP, TITLES_FOR_EXTRA_BLOCKS} from './const';
import {generateMovie} from './mock/movie.js';
import {isEscEvent} from './util';
import {render,  RenderPosition} from './render.js';

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserInfoView().element, RenderPosition.BEFOREEND);
render(siteMainElement, new FilterAndStatsView(movies).element, RenderPosition.BEFOREEND);
render(siteMainElement, new SortView().element, RenderPosition.BEFOREEND);
render(siteMainElement, new MoviesSectionView().element, RenderPosition.BEFOREEND);

const siteMoviesSectionElement = document.querySelector('.films');
const moviesListElement = siteMoviesSectionElement.querySelector('.films-list');
const moviesListContainerElement = siteMoviesSectionElement.querySelector('.films-list__container');

const closePopupElement = (moviePopupComponent) => {

  if (moviePopupComponent) {

    const onEscKeyDown = (evt) => {
      if (isEscEvent) {
        evt.preventDefault();
        siteFooterElement.removeChild(moviePopupComponent);
        document.querySelector('body').classList.remove('hide-overflow');
        document.removeEventListener('keydown', onEscKeyDown);
      }
    };
    document.addEventListener('keydown', onEscKeyDown);

    siteFooterElement.querySelector('.film-details__close-btn').addEventListener('click', () => {
      siteFooterElement.removeChild(moviePopupComponent);
      document.querySelector('body').classList.remove('hide-overflow');
      document.removeEventListener('keydown', onEscKeyDown);
    });
  }
};

const renderPopup = (movie) => {
  const moviePopupComponent = new PopupView(movie).element;
  siteFooterElement.prepend(moviePopupComponent);

  document.querySelector('body').classList.add('hide-overflow');
  closePopupElement(moviePopupComponent);
};

const renderMovieCard = function(place, movie) {
  const movieCardComponent = new MovieCardView(movie).element;

  render(place, movieCardComponent, RenderPosition.BEFOREEND);

  const moviesCardLinkElement = movieCardComponent.querySelector('.film-card__link');

  moviesCardLinkElement.addEventListener('click', () => {
    if (siteFooterElement.firstElementChild.classList.contains('film-details')) {
      siteFooterElement.querySelector('.film-details__close-btn').click();
    }
    renderPopup(movie);
  });
};

if (movies.length > MOVIE_COUNT_PER_STEP) {
  const moviesAll = movies;
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  moviesAll.slice(0, renderedMovieCount).forEach((movie) => renderMovieCard(moviesListContainerElement, movie));

  render(moviesListElement, new ShowMoreButtonView().element, RenderPosition.BEFOREEND);

  const showMoreButton = moviesListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    moviesAll.slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP).forEach((movie) => renderMovieCard(moviesListContainerElement, movie));

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

const renderExtraBlocks = () => {
  const isNullMoviesRating = movies.every((movie) => movie.filmInfo.totalRating === 0);
  const isNullMoviesComments = movies.every((movie) => movie.comments.length === 0);

  const topRatedMovies = movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0,2);
  const mostCommentsMovies = movies.sort((a, b) => b.comments.length - a.comments.length).slice(0,2);

  if (isNullMoviesRating && isNullMoviesComments) {
    TITLES_FOR_EXTRA_BLOCKS.splice(0, 2);
  } else if (isNullMoviesRating) {
    TITLES_FOR_EXTRA_BLOCKS.splice(0, 1);
  } else if (isNullMoviesComments) {
    TITLES_FOR_EXTRA_BLOCKS.splice(1, 1);
  }

  TITLES_FOR_EXTRA_BLOCKS.forEach((title) => {
    render(siteMoviesSectionElement, new MoviesExtraBlocksView(title).element, RenderPosition.BEFOREEND);
  });

  const moviesTopRatedElement = siteMoviesSectionElement.querySelector('.films-list--extra');
  const moviesMostCommentedElement = siteMoviesSectionElement.querySelector('.films-list--extra:last-of-type');

  if (moviesTopRatedElement && moviesTopRatedElement.querySelector('.films-list__title').textContent === 'Top rated') {
    topRatedMovies.forEach((movie) => renderMovieCard(moviesTopRatedElement.querySelector('.films-list__container'), movie));
  }

  if (moviesMostCommentedElement && moviesMostCommentedElement.querySelector('.films-list__title').textContent === 'Most commented') {
    mostCommentsMovies.forEach((movie) => renderMovieCard(moviesMostCommentedElement.querySelector('.films-list__container'), movie));
  }
};

renderExtraBlocks();

render(siteFooterElement, new NumberOfFilmsView(movies.length).element, RenderPosition.BEFOREEND);
