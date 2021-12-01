import {createMovieCardTemplate} from './movie-card-view';

export const createMoviesMostCommentedTemplate = (movies) => {

  const isMovieCommentsNull = movies.every((movie) => movie.comments.length === 0)
    ? 'none'
    : 'films-list films-list--extra';

  return `<section class="${isMovieCommentsNull}">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
      ${createMovieCardTemplate(movies.sort((a, b) => b.comments.length - a.comments.length).slice(0,2))}
    </div>
  </section>`;
};
