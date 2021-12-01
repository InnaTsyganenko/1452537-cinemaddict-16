import {formatRunTime} from '../render';
import {createMovieCardControlsTemplate} from './movie-card-controls-view';

export const createMovieCardTemplate = (movies) => movies.map((movie) => `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${movie.filmInfo.title}</h3>
      <p class="film-card__rating">${movie.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.filmInfo.release.date.format('YYYY')}</span>
        <span class="film-card__duration">${formatRunTime(movie.filmInfo.runtime)}</span>
        <span class="film-card__genre">${movie.filmInfo.genres[0]}</span>
      </p>
      <img src="${movie.filmInfo.poster}" alt="Постер фильма &laquo;${movie.filmInfo.title}&raquo;" class="film-card__poster">
      <p class="film-card__description">${movie.filmInfo.description}</p>
      <span class="film-card__comments">${movie.comments.length === 0 ? 'No' : movie.comments.length} comments</span>
    </a>
    ${createMovieCardControlsTemplate(movie.userDetails)}
  </article>`).join('');
