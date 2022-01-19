import AbstractView from './abstract-view.js';

const createLoadingTemplate = () => (
  `<div>
    <h2 class="loader-text">Loading...</h2>
    <div class="loader">
      <div class="inner one"></div>
      <div class="inner two"></div>
      <div class="inner three"></div>
    </div>
  </div>`
);

export default class LoadingView extends AbstractView {
  get template() {
    return createLoadingTemplate();
  }
}
