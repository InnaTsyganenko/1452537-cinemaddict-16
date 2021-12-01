export const createMovieListEmptyTemplate = () => (
  `<h2 class="films-list__title">
    There are no movies in our database
    <!--
          Значение отображаемого текста зависит от выбранного фильтра:
            * All movies – 'There are no movies in our database'
            * Watchlist — 'There are no movies to watch now';
            * History — 'There are no watched movies now';
            * Favorites — 'There are no favorite movies now'.
        -->
  </h2>`
);
