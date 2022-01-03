import {FilterType} from '../const';

export const filter = {
  [FilterType.ALL]: (movies) => movies,
  [FilterType.WATCHLIST]: (movies) => movies.filter((movie) => movie.userDetails.isInWatchlist),
  [FilterType.HISTORY]: (movies) => movies.filter((movie) => movie.userDetails.isAlreadyWatched),
  [FilterType.FAVORITES]: (movies) => movies.filter((movie) => movie.userDetails.isInFavorite),
};
