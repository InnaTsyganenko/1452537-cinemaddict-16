
import UserInfoView from './view/user-info-view';
import MoviesSectionPresenter from './presenter/movies-section-presenter';

import {MOVIE_COUNT} from './const';
import {generateMovie} from './mock/movie';
import {render, RenderPosition} from './utils/render';

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

const moviesSectionPresenter = new MoviesSectionPresenter(siteMainElement, siteFooterElement);
moviesSectionPresenter.init(movies);
