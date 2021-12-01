export const createFilterAndStatsTemplate = (movies) => {

  const isInWatchlist = movies.filter((movie) => movie.userDetails.isInWatchlist).length;
  const isAlreadyWatched = movies.filter((movie) => movie.userDetails.isAlreadyWatched).length;
  const isInFavorite = movies.filter((movie) => movie.userDetails.isInFavorite).length;

  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${isInWatchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${isAlreadyWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${isInFavorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};
