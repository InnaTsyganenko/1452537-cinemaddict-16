
import UserInfoView from './view/user-info-view';
import MainNavView from './view/main-nav-view';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesSectionPresenter from './presenter/movies-section-presenter';
import {MOVIE_COUNT} from './const';
import {generateMovie} from './mock/movie';
import {render, RenderPosition} from './utils/render';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model';

const movies = Array.from({length: MOVIE_COUNT}, generateMovie);

const mainNavComponent = new MainNavView();

const moviesModel = new MoviesModel();
moviesModel.movies = movies;

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

render(siteMainElement, mainNavComponent, RenderPosition.AFTERBEGIN);
render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

const filterPresenter = new FilterPresenter(mainNavComponent.element, filterModel, moviesModel);
const moviesSectionPresenter = new MoviesSectionPresenter(siteMainElement, siteFooterElement, moviesModel, filterModel);
filterPresenter.init();
moviesSectionPresenter.init();
