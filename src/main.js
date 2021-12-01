import {createUserInfoTemplate} from './view/user-info-view';
import {createFilterAndStatsTemplate} from './view/filter-and-stats-view';
import {createSortTemplate} from './view/sort-view';
import {createMoviesSectionTemplate} from './view/movies-section-view';
import {createMovieCardTemplate} from './view/movie-card-view';
import {createMoviesTopRatedTemplate} from './view/movies-top-rated-view';
import {createMoviesMostCommentedTemplate} from './view/movies-most-commented-view';
import {createShowMoreButtonTemplate} from './view/show-more-button-view';
import {createNumberOfFilmsTemplate} from './view/number-of-films-view';
import {MOVIE_COUNT, MOVIE_COUNT_PER_STEP} from './const';
import {createPopupTemplate} from './view/popup-view';
import {generateMovie} from './mock/movie.js';

import {renderTemplate, RenderPosition} from './render.js';

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteHeaderElement, createUserInfoTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilterAndStatsTemplate(movies), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createMoviesSectionTemplate(), RenderPosition.BEFOREEND);

const siteMoviesSectionElement = document.querySelector('.films');
const moviesListElement = siteMainElement.querySelector('.films-list');
const moviesListContainerElement = siteMainElement.querySelector('.films-list__container');

if (movies.length > MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = MOVIE_COUNT_PER_STEP;

  renderTemplate(moviesListContainerElement, createMovieCardTemplate(movies.slice(0, MOVIE_COUNT_PER_STEP)), RenderPosition.AFTERBEGIN);

  renderTemplate(moviesListElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);

  const showMoreButton = moviesListElement.querySelector('.films-list__show-more');

  showMoreButton.addEventListener('click', (evt) => {
    evt.preventDefault();

    renderTemplate(moviesListContainerElement, createMovieCardTemplate(movies.slice(renderedMovieCount, renderedMovieCount + MOVIE_COUNT_PER_STEP)), RenderPosition.AFTERBEGIN);

    renderedMovieCount += MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}
renderTemplate(siteMoviesSectionElement, createMoviesTopRatedTemplate(movies), RenderPosition.BEFOREEND);
renderTemplate(siteMoviesSectionElement, createMoviesMostCommentedTemplate(movies), RenderPosition.BEFOREEND);

renderTemplate(siteFooterElement, createNumberOfFilmsTemplate(movies.length), RenderPosition.BEFOREEND);

renderTemplate(moviesListElement, createPopupTemplate(movies[0]), RenderPosition.BEFOREEND);
