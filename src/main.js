
import UserInfoView from './view/user-info-view';
import MainNavView from './view/main-nav-view';
import StatsView from './view/stats-view';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesPresenter from './presenter/movies-presenter';
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
const moviesPresenter = new MoviesPresenter(siteMainElement, siteFooterElement, moviesModel, filterModel);

let statsComponent = null;
const userRank = siteHeaderElement.querySelector('.profile__rating').textContent;
const userSrcImg = siteHeaderElement.querySelector('.profile__avatar').src;

const handleSiteMenuClick = (menuItem) => {
  const isInHistoryMovies = moviesModel.movies.filter((movie) => movie.userDetails.isAlreadyWatched);
  switch (menuItem.value) {
    case 'main-navigation__additional main-navigation__additional--active':
      moviesPresenter.destroy();
      statsComponent = new StatsView(userRank, userSrcImg, isInHistoryMovies);
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
    default:
      moviesPresenter.init();
      statsComponent.element.remove();
      break;
  }
};

mainNavComponent.setMenuClickHandler(handleSiteMenuClick);

filterPresenter.init();
moviesPresenter.init();
