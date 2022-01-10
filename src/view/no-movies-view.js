import AbstractView from './abstract-view.js';
import {FilterType} from '../const.js';

const NoMoviesTextType = {
  [FilterType.ALL]: 'There are no movies in our database',
  [FilterType.WATCHLIST]: 'There are no movies in watchlist now',
  [FilterType.HISTORY]: 'There are no watched movies now',
  [FilterType.FAVORITES]: 'There are no favorite movies now',
};

const createNoMovieTemplate = (filterType) => {
  const noMovieTextValue = NoMoviesTextType[filterType];
  return (
    `<h2 class="films-list__title">
      ${noMovieTextValue}
      </h2>`);
};

export default class NoMovieView extends AbstractView {
  constructor(data) {
    super();
    this._data = data;
  }

  get template() {
    return createNoMovieTemplate(this._data);
  }
}
