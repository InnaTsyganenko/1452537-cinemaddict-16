import {USER_RANK} from '../const';
import {getRandomInteger} from '../util';

export const createUserInfoTemplate = () => (
  `<section class="header__profile profile">
    <p class="profile__rating">
      ${USER_RANK[getRandomInteger(0, USER_RANK.length - 1)]}
    </p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`
);
