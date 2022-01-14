import AbstractView from './abstract-view.js';

const createMainNavTemplate = () => `<nav class="main-navigation">
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;

export default class MainNavView extends AbstractView {
  get template() {
    return createMainNavTemplate();
  }

  setMenuClickHandler = (callback) => {
    this._callback.menuClick = callback;
    this.element.querySelector('.main-navigation__additional').addEventListener('click', this.#menuClickHandler);
  }

  #menuClickHandler = (evt) => {
    evt.preventDefault();
    evt.target.classList.toggle('main-navigation__additional--active');
    this._callback.menuClick(evt.target.classList);
  }
}
