export const MOVIE_COUNT_PER_STEP = 5;
export const EMOTIONS = ['smile', 'sleeping', 'puke','angry'];

export const USER_RANK = ['Novice', 'Fan', 'Movie Buff'];
export const CONTROLS_BUTTON = ['watchlist', 'watched', 'favorite'];

export const FilterType = {
  ALL: 'all',
  WATCHLIST: 'watchlist',
  HISTORY: 'history',
  FAVORITES: 'favorites',
};

export const SortType = {
  DEFAULT: 'default',
  DATE: 'date',
  RATING: 'rating',
};

export const UserAction = {
  UPDATE_MOVIE: 'UPDATE_MOVIE',
  DELETE_COMMENT: 'DELETE_COMMENT',
  ADD_COMMENT: 'ADD_COMMENT',
  GET_COMMENTS: 'GET_COMMENTS',
};

export const UpdateType = {
  PATCH: 'PATCH',
  MINOR: 'MINOR',
  MAJOR: 'MAJOR',
  INIT: 'INIT',
};
