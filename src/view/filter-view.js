import {capitalizeFirstLetter} from '../util';
import {FILTERS_VALUES} from '../const';

export const createFilterTemplate = (movies, isActive) => {
  const isInWatchlist = movies.filter((movie) => movie.userDetails.isInWatchlist).length;
  const isAlreadyWatched = movies.filter((movie) => movie.userDetails.isAlreadyWatched).length;
  const isInFavorite = movies.filter((movie) => movie.userDetails.isInFavorite).length;

  return FILTERS_VALUES.map((value) => `<a href="#${value}" class="main-navigation__item main-navigation__item${(isActive === value) ? '--active' : ''}">${capitalizeFirstLetter(value)}
  ${value === FILTERS_VALUES[0]
    ? 'movies'
    : `<span class="main-navigation__item-count">
        ${value === FILTERS_VALUES[1] ? isInWatchlist : ''}
        ${value === FILTERS_VALUES[2] ? isAlreadyWatched : ''}
        ${value === FILTERS_VALUES[3] ? isInFavorite : ''}
    </span>`}</a>`).join('');
};
