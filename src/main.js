
import UserInfoView from './view/user-info-view';
import MainNavView from './view/main-nav-view';
import StatsView from './view/stats-view';
import NumberOfFilmsView from './view/number-of-films-view';
import FilterPresenter from './presenter/filter-presenter.js';
import MoviesPresenter from './presenter/movies-presenter';
import {render, RenderPosition} from './utils/render';
import MoviesModel from './model/movies-model';
import FilterModel from './model/filter-model';
import ApiService from './api-service.js';

const AUTHORIZATION = 'Basic kljhkjdfhgkjdfhgkjdhfgkjdhdfhhjjhk';
const END_POINT = 'https://16.ecmascript.pages.academy/cinemaddict';

const mainNavComponent = new MainNavView();

const moviesModel = new MoviesModel(new ApiService(END_POINT, AUTHORIZATION));

const filterModel = new FilterModel();

const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');

const filterPresenter = new FilterPresenter(mainNavComponent.element, filterModel, moviesModel);
const moviesPresenter = new MoviesPresenter(siteMainElement, siteFooterElement, moviesModel, filterModel);

const handleSiteMenuClick = (menuItem) => {
  let statsComponent =  null;
  const userRank = siteHeaderElement.querySelector('.profile__rating').textContent;
  const userSrcImg = siteHeaderElement.querySelector('.profile__avatar').src;
  const isInHistoryMovies = moviesModel.movies.filter((movie) => movie.userDetails.isAlreadyWatched);
  switch (menuItem.value) {
    case 'main-navigation__additional main-navigation__additional--active':
      moviesPresenter.destroy();
      statsComponent = new StatsView(userRank, userSrcImg, isInHistoryMovies);
      render(siteMainElement, statsComponent, RenderPosition.BEFOREEND);
      break;
    default:
      moviesPresenter.init();
      document.querySelector('.statistic').remove();
      break;
  }
};

filterPresenter.init();
moviesPresenter.init();

moviesModel.init().finally(() => {
  render(siteHeaderElement, new UserInfoView(), RenderPosition.BEFOREEND);

  render(siteMainElement, mainNavComponent, RenderPosition.AFTERBEGIN);
  mainNavComponent.setMenuClickHandler(handleSiteMenuClick);

  render(siteFooterElement, new NumberOfFilmsView(moviesModel.movies.length), RenderPosition.BEFOREEND);
});
