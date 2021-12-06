export const createMovieCardControlsTemplate = (userDetails) => {

  const watchlistClassActive = userDetails.isInWatchlist
    ? 'film-card__controls-item--active'
    : '';

  const alreadyWatchedClassActive = userDetails.isAlreadyWatched
    ? 'film-card__controls-item--active'
    : '';

  const favoriteClassActive = userDetails.isInFavorite
    ? 'film-card__controls-item--active'
    : '';

  return `<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
  </div>`;
};
