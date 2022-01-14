import AbstractView from './abstract-view.js';

const createUserInfoTemplate = (movieHistoryCount) => (
  `<section class="header__profile profile">
    ${movieHistoryCount === 0 ? '' : `
    <p class="profile__rating">
      ${movieHistoryCount > 0 && movieHistoryCount <=10 ? 'Novice' : ''}
      ${movieHistoryCount >= 11 && movieHistoryCount <=20 ? 'Fan' : ''}
      ${movieHistoryCount >= 21 ? 'Movie Buff' : ''}
    </p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`}`
);

export default class UserInfoView extends AbstractView {
  #movieHistoryCount = null;

  constructor(movieHistoryCount) {
    super();
    this.#movieHistoryCount = movieHistoryCount;
  }

  get template() {
    return createUserInfoTemplate(this.#movieHistoryCount);
  }
}
