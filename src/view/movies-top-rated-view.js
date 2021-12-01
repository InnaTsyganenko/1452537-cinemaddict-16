import {createMovieCardTemplate} from './movie-card-view';

export const createMoviesTopRatedTemplate = (movies) => {

  const isTotalRatingsNull = movies.every((movie) => movie.filmInfo.totalRating === 0)
    ? 'none'
    : 'films-list films-list--extra';

  return `<section class="${isTotalRatingsNull}">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
    ${createMovieCardTemplate(movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0,2))}
  </div>
</section>`;
};
