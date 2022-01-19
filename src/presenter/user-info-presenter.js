import UserInfoView from '../view/user-info-view';
import {render, RenderPosition, replace, remove} from '../utils/render.js';

export default class UserInfoPresenter {
  #userInfoContainer = null;
  #userInfoModel = null;
  #moviesModel = null;

  #userInfoComponent = null;

  constructor(userInfoContainer, userInfoModel, moviesModel) {
    this.#userInfoContainer = userInfoContainer;
    this.#userInfoModel = userInfoModel;
    this.#moviesModel = moviesModel;

    this.#moviesModel.addObserver(this.#handleModelEvent);
    this.#userInfoModel.addObserver(this.#handleModelEvent);
  }

  init = () => {
    const prevUserInfoComponent = this.#userInfoComponent;

    this.#userInfoComponent = new UserInfoView(this.#userInfoModel.movieHistoryCount);

    if (prevUserInfoComponent === null) {
      render(this.#userInfoContainer, this.#userInfoComponent, RenderPosition.BEFOREEND);
      return;
    }

    replace(this.#userInfoComponent, prevUserInfoComponent);
    remove(prevUserInfoComponent);
  }

  #handleModelEvent = () => {
    this.init();
  }
}
