import AbstractView from './abstract-view.js';

const createMoviesMostCommentedTemplate = () => `<section class="films-list films-list--extra">
  <h2 class="films-list__title">Most commented</h2>
  <div class="films-list__container"></div>
</section>`;

export default class MoviesMostCommentedView extends AbstractView {
  get template() {
    return createMoviesMostCommentedTemplate();
  }
}

