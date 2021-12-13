import AbstractView from './abstract-view.js';

export const NoMovieTemplate = () => (
  '<h2 class="films-list__title">There are no movies in our database</h2>'
);

export default class NoMovieView extends AbstractView {
  get template() {
    return NoMovieTemplate();
  }
}
