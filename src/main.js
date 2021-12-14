
import UserInfoView from './view/user-info-view';
import MainNavView from './view/main-nav-view';
import SortView from './view/sort-view';
import MoviesSectionPresenter from './presenter/movies-section-presenter';
import NumberOfFilmsView from './view/number-of-films-view';
import {MOVIE_COUNT, FILTERS_VALUES} from './const';
import {generateMovie} from './mock/movie';
import {render,  RenderPosition} from './utils/render';

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);
render(siteMainElement, new MainNavView(movies, FILTERS_VALUES[0]), RenderPosition.AFTERBEGIN);

render(siteMainElement, new SortView(), RenderPosition.BEFOREEND);

const moviesSectionPresenter = new MoviesSectionPresenter(siteMainElement);

moviesSectionPresenter.init(movies);

render(siteFooterElement, new NumberOfFilmsView(movies.length), RenderPosition.BEFOREEND);
