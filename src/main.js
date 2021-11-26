import {createUserInfoTemplate} from './view/user-info-view';
import {createFilterAndStatsTemplate} from './view/filter-and-stats-view';
import {createSortTemplate} from './view/sort-view';
import {createMovieListTemplate} from './view/movies-list-view';
import {createMovieCardTemplate} from './view/movie-card-view';
import {createShowMoreButtonTemplate} from './view/show-more-button-view';
import {createNumberOfFilmsTemplate} from './view/number-of-films-view';

import {renderTemplate, RenderPosition} from './render.js';

const MOVIE_COUNT = 5;

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

renderTemplate(siteHeaderElement, createUserInfoTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteMainElement, createSortTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createFilterAndStatsTemplate(), RenderPosition.AFTERBEGIN);
renderTemplate(siteMainElement, createMovieListTemplate(), RenderPosition.BEFOREEND);
renderTemplate(siteFooterElement, createNumberOfFilmsTemplate(), RenderPosition.BEFOREEND);

const moviesElement = siteMainElement.querySelector('.films-list');
const moviesListElement = moviesElement.querySelector('.films-list__container');

for (let i = 0; i < MOVIE_COUNT; i++) {
  renderTemplate(moviesListElement, createMovieCardTemplate(), RenderPosition.AFTERBEGIN);
}

renderTemplate(moviesElement, createShowMoreButtonTemplate(), RenderPosition.BEFOREEND);
