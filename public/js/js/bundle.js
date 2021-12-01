/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/const.js":
/*!**********************!*\
  !*** ./src/const.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "MOVIE_COUNT": () => (/* binding */ MOVIE_COUNT),
/* harmony export */   "MOVIE_COUNT_PER_STEP": () => (/* binding */ MOVIE_COUNT_PER_STEP),
/* harmony export */   "EMOTIONS": () => (/* binding */ EMOTIONS),
/* harmony export */   "TEXT": () => (/* binding */ TEXT),
/* harmony export */   "USER_RANK": () => (/* binding */ USER_RANK)
/* harmony export */ });
const MOVIE_COUNT = 18;
const MOVIE_COUNT_PER_STEP = 5;
const EMOTIONS = ['angry', 'puke', 'sleeping', 'smile'];
const TEXT = ['Lorem ipsum dolor sit amet, consectetur adipiscing elit.', 'Cras aliquet varius magna, non porta ligula feugiat eget.', 'Fusce tristique felis at fermentum pharetra.', 'Aliquam id orci ut lectus varius viverra.', 'Nullam nunc ex, convallis sed finibus eget, sollicitudin eget ante.', 'Phasellus eros mauris, condimentum sed nibh vitae, sodales efficitur ipsum.', 'Sed blandit, eros vel aliquam faucibus, purus ex euismod diam, eu luctus nunc ante ut dui.', 'Sed sed nisi sed augue convallis suscipit in sed felis.', 'Aliquam erat volutpat.', 'Nunc fermentum tortor ac porta dapibus.', 'In rutrum ac purus sit amet tempus.'];
const USER_RANK = ['Novice', 'Fan', 'Movie Buff'];

/***/ }),

/***/ "./src/mock/comment.js":
/*!*****************************!*\
  !*** ./src/mock/comment.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateComment": () => (/* binding */ generateComment)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.dev.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../const */ "./src/const.js");





const generateCommentAuthor = () => {
  const titles = ['John Doe', 'Jane Doe', 'Вася Пупкин', 'Марьиванна'];
  const randomIndex = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, titles.length - 1);
  return titles[randomIndex];
};

const generateComment = () => ({
  id: (0,nanoid__WEBPACK_IMPORTED_MODULE_3__.nanoid)(),
  author: generateCommentAuthor(),
  comment: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElements)(_const__WEBPACK_IMPORTED_MODULE_2__.TEXT, 1),
  date: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().subtract((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 5000), 'day'),
  emotion: _const__WEBPACK_IMPORTED_MODULE_2__.EMOTIONS[(0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, _const__WEBPACK_IMPORTED_MODULE_2__.EMOTIONS.length - 1)]
});

/***/ }),

/***/ "./src/mock/movie.js":
/*!***************************!*\
  !*** ./src/mock/movie.js ***!
  \***************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "generateMovie": () => (/* binding */ generateMovie)
/* harmony export */ });
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! dayjs */ "./node_modules/dayjs/dayjs.min.js");
/* harmony import */ var dayjs__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(dayjs__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var nanoid__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! nanoid */ "./node_modules/nanoid/index.dev.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.js");
/* harmony import */ var _mock_comment__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ../mock/comment */ "./src/mock/comment.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ../const */ "./src/const.js");





const COMMENT_COUNT = 30;
const comments = Array.from({
  length: COMMENT_COUNT
}, _mock_comment__WEBPACK_IMPORTED_MODULE_2__.generateComment);

const generateMovieTitle = () => {
  const titles = ['Ветреная река', 'Во все тяжкие', 'Шпион', 'Один дома', 'Шпион', 'Законопослушный гражданин', 'Три билборда на границе Эббинга, Миссури'];
  const randomIndex = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, titles.length - 1);
  return titles[randomIndex];
};

const generateMoviePoster = () => {
  const posters = ['./images/posters/made-for-each-other.png', './images/posters/popeye-meets-sinbad.png', './images/posters/sagebrush-trail.jpg', './images/posters/santa-claus-conquers-the-martians.jpg', './images/posters/the-dance-of-life.jpg', './images/posters/the-great-flamarion.jpg', './images/posters/the-man-with-the-golden-arm.jpg'];
  const randomIndex = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, posters.length - 1);
  return posters[randomIndex];
};

const generateMovieWriters = () => {
  const writers = ['Haruki Murakami', 'Colson Whitehead', 'Donna Tartt', 'Hanya Yanagihara', 'Ann Patchett', 'Chimamanda Ngozi Adichie', 'Arundhati Roy', 'Zadie Smith'];
  return (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElements)(writers, 1);
};

const generateMovieDirector = () => {
  const directors = ['Christopher Nolan', 'Stanley Kubrick', 'Quentin Tarantino', 'Steven Spielberg', 'Akira Kurosawa', 'Martin Scorsese'];
  const randomIndex = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, directors.length - 1);
  return directors[randomIndex];
};

const generateMovieGenres = () => {
  const genres = ['Drama', 'Comedy', 'Serial', 'Romance', 'Comedy', 'Detective', 'Thriller', 'Crime', 'Horror', 'Animated film', 'Sitcom', 'Short film', 'Documentary'];
  return (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElements)(genres, 1);
};

const generateMovieReleaseCountry = () => {
  const country = ['Finland', 'Russia', 'USA', 'Germany', 'France', 'Japan'];
  const randomIndex = (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, country.length - 1);
  return country[randomIndex];
};

const generateMovie = () => {
  const isInWatchlist = Boolean((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 1));
  const watchingDate = isInWatchlist ? dayjs__WEBPACK_IMPORTED_MODULE_0___default()().subtract((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 5000), 'day') : null;
  return {
    id: (0,nanoid__WEBPACK_IMPORTED_MODULE_4__.nanoid)(),
    comments: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElements)(comments, 0),
    filmInfo: {
      title: generateMovieTitle(),
      alternativeTitle: generateMovieTitle(),
      totalRating: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArbitrary)(1, 10).toFixed(1),
      poster: generateMoviePoster(),
      ageRating: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 18),
      director: generateMovieDirector(),
      writers: generateMovieWriters(),
      actors: generateMovieWriters(),
      release: {
        date: dayjs__WEBPACK_IMPORTED_MODULE_0___default()().subtract((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 5000), 'day'),
        releaseCountry: generateMovieReleaseCountry()
      },
      runtime: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(2, 200),
      genres: generateMovieGenres(),
      description: (0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomArrayElements)(_const__WEBPACK_IMPORTED_MODULE_3__.TEXT, 1)
    },
    userDetails: {
      isInWatchlist,
      isAlreadyWatched: Boolean((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 1)),
      watchingDate,
      isInFavorite: Boolean((0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, 1))
    }
  };
};

/***/ }),

/***/ "./src/render.js":
/*!***********************!*\
  !*** ./src/render.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "RenderPosition": () => (/* binding */ RenderPosition),
/* harmony export */   "renderTemplate": () => (/* binding */ renderTemplate),
/* harmony export */   "formatRunTime": () => (/* binding */ formatRunTime)
/* harmony export */ });
const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend'
};
const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};
const formatRunTime = runtime => {
  let result = runtime;
  const runTimeInHours = Math.floor(runtime / 60);
  const minutes = runtime - runTimeInHours * 60;

  if (runTimeInHours >= 1 && minutes >= 1) {
    result = `${runTimeInHours}h ${minutes}m`;
  } else if (runTimeInHours === 0) {
    result = `${minutes}m`;
  } else if (minutes === 0) {
    result = `${runTimeInHours}h`;
  }

  return result;
};

/***/ }),

/***/ "./src/util.js":
/*!*********************!*\
  !*** ./src/util.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getRandomInteger": () => (/* binding */ getRandomInteger),
/* harmony export */   "getRandomArbitrary": () => (/* binding */ getRandomArbitrary),
/* harmony export */   "getRandomArrayElements": () => (/* binding */ getRandomArrayElements)
/* harmony export */ });
// Функция из интернета по генерации случайного числа из диапазона
// Источник - https://github.com/you-dont-need/You-Dont-Need-Lodash-Underscore#_random
const getRandomInteger = (a = 0, b = 1) => {
  const lower = Math.ceil(Math.min(a, b));
  const upper = Math.floor(Math.max(a, b));
  return Math.floor(lower + Math.random() * (upper - lower + 1));
};
const getRandomArbitrary = function (min, max) {
  return Math.random() * (max - min) + min;
};
const getRandomArrayElements = function (arr, minValue) {
  const shuffledArr = arr.slice(0);
  const count = getRandomInteger(minValue, arr.length);
  let i = arr.length;
  const min = i - count;
  let temp;
  let index;

  while (i-- > min) {
    index = Math.floor((i + 1) * Math.random());
    temp = shuffledArr[index];
    shuffledArr[index] = shuffledArr[i];
    shuffledArr[i] = temp;
  }

  return shuffledArr.slice(min);
};

/***/ }),

/***/ "./src/view/filter-and-stats-view.js":
/*!*******************************************!*\
  !*** ./src/view/filter-and-stats-view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createFilterAndStatsTemplate": () => (/* binding */ createFilterAndStatsTemplate)
/* harmony export */ });
const createFilterAndStatsTemplate = movies => {
  const isInWatchlist = movies.filter(movie => movie.userDetails.isInWatchlist).length;
  const isAlreadyWatched = movies.filter(movie => movie.userDetails.isAlreadyWatched).length;
  const isInFavorite = movies.filter(movie => movie.userDetails.isInFavorite).length;
  return `<nav class="main-navigation">
    <div class="main-navigation__items">
      <a href="#all" class="main-navigation__item main-navigation__item--active">All movies</a>
      <a href="#watchlist" class="main-navigation__item">Watchlist <span class="main-navigation__item-count">${isInWatchlist}</span></a>
      <a href="#history" class="main-navigation__item">History <span class="main-navigation__item-count">${isAlreadyWatched}</span></a>
      <a href="#favorites" class="main-navigation__item">Favorites <span class="main-navigation__item-count">${isInFavorite}</span></a>
    </div>
    <a href="#stats" class="main-navigation__additional">Stats</a>
  </nav>`;
};

/***/ }),

/***/ "./src/view/movie-card-controls-view.js":
/*!**********************************************!*\
  !*** ./src/view/movie-card-controls-view.js ***!
  \**********************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMovieCardControlsTemplate": () => (/* binding */ createMovieCardControlsTemplate)
/* harmony export */ });
const createMovieCardControlsTemplate = movie => {
  const watchlistClassActive = movie.isInWatchlist ? 'film-card__controls-item--active' : '';
  const alreadyWatchedClassActive = movie.isAlreadyWatched ? 'film-card__controls-item--active' : '';
  const favoriteClassActive = movie.isInFavorite ? 'film-card__controls-item--active' : '';
  return `<div class="film-card__controls">
    <button class="film-card__controls-item film-card__controls-item--add-to-watchlist ${watchlistClassActive}" type="button">Add to watchlist</button>
    <button class="film-card__controls-item film-card__controls-item--mark-as-watched ${alreadyWatchedClassActive}" type="button">Mark as watched</button>
    <button class="film-card__controls-item film-card__controls-item--favorite ${favoriteClassActive}" type="button">Mark as favorite</button>
  </div>`;
};

/***/ }),

/***/ "./src/view/movie-card-view.js":
/*!*************************************!*\
  !*** ./src/view/movie-card-view.js ***!
  \*************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMovieCardTemplate": () => (/* binding */ createMovieCardTemplate)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
/* harmony import */ var _movie_card_controls_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./movie-card-controls-view */ "./src/view/movie-card-controls-view.js");


const createMovieCardTemplate = movies => movies.map(movie => `<article class="film-card">
    <a class="film-card__link">
      <h3 class="film-card__title">${movie.filmInfo.title}</h3>
      <p class="film-card__rating">${movie.filmInfo.totalRating}</p>
      <p class="film-card__info">
        <span class="film-card__year">${movie.filmInfo.release.date.format('YYYY')}</span>
        <span class="film-card__duration">${(0,_render__WEBPACK_IMPORTED_MODULE_0__.formatRunTime)(movie.filmInfo.runtime)}</span>
        <span class="film-card__genre">${movie.filmInfo.genres[0]}</span>
      </p>
      <img src="${movie.filmInfo.poster}" alt="Постер фильма &laquo;${movie.filmInfo.title}&raquo;" class="film-card__poster">
      <p class="film-card__description">${movie.filmInfo.description}</p>
      <span class="film-card__comments">${movie.comments.length === 0 ? 'No' : movie.comments.length} comments</span>
    </a>
    ${(0,_movie_card_controls_view__WEBPACK_IMPORTED_MODULE_1__.createMovieCardControlsTemplate)(movie.userDetails)}
  </article>`).join('');

/***/ }),

/***/ "./src/view/movies-most-commented-view.js":
/*!************************************************!*\
  !*** ./src/view/movies-most-commented-view.js ***!
  \************************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMoviesMostCommentedTemplate": () => (/* binding */ createMoviesMostCommentedTemplate)
/* harmony export */ });
/* harmony import */ var _movie_card_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movie-card-view */ "./src/view/movie-card-view.js");

const createMoviesMostCommentedTemplate = movies => {
  const isMovieCommentsNull = movies.every(movie => movie.comments.length === 0) ? 'none' : 'films-list films-list--extra';
  return `<section class="${isMovieCommentsNull}">
    <h2 class="films-list__title">Most commented</h2>
    <div class="films-list__container">
      ${(0,_movie_card_view__WEBPACK_IMPORTED_MODULE_0__.createMovieCardTemplate)(movies.sort((a, b) => b.comments.length - a.comments.length).slice(0, 2))}
    </div>
  </section>`;
};

/***/ }),

/***/ "./src/view/movies-section-view.js":
/*!*****************************************!*\
  !*** ./src/view/movies-section-view.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMoviesSectionTemplate": () => (/* binding */ createMoviesSectionTemplate)
/* harmony export */ });
const createMoviesSectionTemplate = () => `
<section class="films">
  <section class="films-list">
    <h2 class="films-list__title visually-hidden">All movies. Upcoming</h2>
    <div class="films-list__container">
    </div>
  </section>
</section>`;

/***/ }),

/***/ "./src/view/movies-top-rated-view.js":
/*!*******************************************!*\
  !*** ./src/view/movies-top-rated-view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createMoviesTopRatedTemplate": () => (/* binding */ createMoviesTopRatedTemplate)
/* harmony export */ });
/* harmony import */ var _movie_card_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./movie-card-view */ "./src/view/movie-card-view.js");

const createMoviesTopRatedTemplate = movies => {
  const isTotalRatingsNull = movies.every(movie => movie.filmInfo.totalRating === 0) ? 'none' : 'films-list films-list--extra';
  return `<section class="${isTotalRatingsNull}">
  <h2 class="films-list__title">Top rated</h2>
  <div class="films-list__container">
    ${(0,_movie_card_view__WEBPACK_IMPORTED_MODULE_0__.createMovieCardTemplate)(movies.sort((a, b) => b.filmInfo.totalRating - a.filmInfo.totalRating).slice(0, 2))}
  </div>
</section>`;
};

/***/ }),

/***/ "./src/view/number-of-films-view.js":
/*!******************************************!*\
  !*** ./src/view/number-of-films-view.js ***!
  \******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createNumberOfFilmsTemplate": () => (/* binding */ createNumberOfFilmsTemplate)
/* harmony export */ });
const createNumberOfFilmsTemplate = moviesCount => `<section class="footer__statistics">
    <p>${moviesCount} movies inside</p>
  </section>`;

/***/ }),

/***/ "./src/view/popup-comments-view.js":
/*!*****************************************!*\
  !*** ./src/view/popup-comments-view.js ***!
  \*****************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopupCommentsListTemplate": () => (/* binding */ createPopupCommentsListTemplate)
/* harmony export */ });
const createPopupCommentsListTemplate = comments => comments.sort((a, b) => b.date - a.date).map(comment => `<li class="film-details__comment">
    <span class="film-details__comment-emoji">
      <img src="./images/emoji/${comment.emotion}.png" width="55" height="55" alt="emoji-${comment.emotion}">
    </span>
    <div>
      <p class="film-details__comment-text">${comment.comment}</p>
      <p class="film-details__comment-info">
        <span class="film-details__comment-author">${comment.author}</span>
        <span class="film-details__comment-day">${comment.date.format('YYYY/MM/DD HH:MM')}</span>
        <button class="film-details__comment-delete">Delete</button>
      </p>
    </div>
  </li>`).join('');

/***/ }),

/***/ "./src/view/popup-genres-view.js":
/*!***************************************!*\
  !*** ./src/view/popup-genres-view.js ***!
  \***************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopupGenresTemplate": () => (/* binding */ createPopupGenresTemplate)
/* harmony export */ });
const createPopupGenresTemplate = genres => [...new Set(genres)].sort().map(genre => `<span class="film-details__genre">${genre}</span>`).join('\n');

/***/ }),

/***/ "./src/view/popup-view.js":
/*!********************************!*\
  !*** ./src/view/popup-view.js ***!
  \********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createPopupTemplate": () => (/* binding */ createPopupTemplate)
/* harmony export */ });
/* harmony import */ var _render__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../render */ "./src/render.js");
/* harmony import */ var _popup_genres_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./popup-genres-view */ "./src/view/popup-genres-view.js");
/* harmony import */ var _popup_comments_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./popup-comments-view */ "./src/view/popup-comments-view.js");



const createPopupTemplate = movie => {
  const {
    filmInfo
  } = movie;
  return `<section class="film-details">
    <form class="film-details__inner" action="" method="get">
      <div class="film-details__top-container">
        <div class="film-details__close">
          <button class="film-details__close-btn" type="button">close</button>
        </div>
        <div class="film-details__info-wrap">
          <div class="film-details__poster">
            <img class="film-details__poster-img" src="${filmInfo.poster}" alt="Постер фильма &laquo;${filmInfo.title}&raquo;">

            <p class="film-details__age">${`${filmInfo.ageRating}+`}</p>
          </div>

          <div class="film-details__info">
            <div class="film-details__info-head">
              <div class="film-details__title-wrap">
                <h3 class="film-details__title">${filmInfo.title}</h3>
                <p class="film-details__title-original">Original: ${filmInfo.alternativeTitle}</p>
              </div>

              <div class="film-details__rating">
                <p class="film-details__total-rating">${filmInfo.totalRating}</p>
              </div>
            </div>

            <table class="film-details__table">
              <tr class="film-details__row">
                <td class="film-details__term">Director</td>
                <td class="film-details__cell">${filmInfo.director}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Writers</td>
                <td class="film-details__cell">${filmInfo.writers}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Actors</td>
                <td class="film-details__cell">${filmInfo.actors}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Release Date</td>
                <td class="film-details__cell">${filmInfo.release.date.format('DD MMMM YYYY')}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Runtime</td>
                <td class="film-details__cell">${(0,_render__WEBPACK_IMPORTED_MODULE_0__.formatRunTime)(filmInfo.runtime)}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Country</td>
                <td class="film-details__cell">${filmInfo.release.releaseCountry}</td>
              </tr>
              <tr class="film-details__row">
                <td class="film-details__term">Genres</td>
                <td class="film-details__cell">
                  ${(0,_popup_genres_view__WEBPACK_IMPORTED_MODULE_1__.createPopupGenresTemplate)(filmInfo.genres)}
                </td>
              </tr>
            </table>

            <p class="film-details__film-description">${filmInfo.description}</p>
          </div>
        </div>

        <section class="film-details__controls">
          <button type="button" class="film-details__control-button film-details__control-button--watchlist" id="watchlist" name="watchlist">Add to watchlist</button>
          <button type="button" class="film-details__control-button film-details__control-button--active film-details__control-button--watched" id="watched" name="watched">Already watched</button>
          <button type="button" class="film-details__control-button film-details__control-button--favorite" id="favorite" name="favorite">Add to favorites</button>
        </section>
      </div>

      <div class="film-details__bottom-container">
        <section class="film-details__comments-wrap">
          <h3 class="film-details__comments-title">Comments <span class="film-details__comments-count">${movie.comments.length}</span></h3>

          <ul class="film-details__comments-list">
            ${(0,_popup_comments_view__WEBPACK_IMPORTED_MODULE_2__.createPopupCommentsListTemplate)(movie.comments)}
          </ul>

          <div class="film-details__new-comment">
            <div class="film-details__add-emoji-label"></div>

            <label class="film-details__comment-label">
              <textarea class="film-details__comment-input" placeholder="Select reaction below and write comment here" name="comment"></textarea>
            </label>

            <div class="film-details__emoji-list">
              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-smile" value="smile">
              <label class="film-details__emoji-label" for="emoji-smile">
                <img src="./images/emoji/smile.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-sleeping" value="sleeping">
              <label class="film-details__emoji-label" for="emoji-sleeping">
                <img src="./images/emoji/sleeping.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-puke" value="puke">
              <label class="film-details__emoji-label" for="emoji-puke">
                <img src="./images/emoji/puke.png" width="30" height="30" alt="emoji">
              </label>

              <input class="film-details__emoji-item visually-hidden" name="comment-emoji" type="radio" id="emoji-angry" value="angry">
              <label class="film-details__emoji-label" for="emoji-angry">
                <img src="./images/emoji/angry.png" width="30" height="30" alt="emoji">
              </label>
            </div>
          </div>
        </section>
      </div>
    </form>
  </section>`;
};

/***/ }),

/***/ "./src/view/show-more-button-view.js":
/*!*******************************************!*\
  !*** ./src/view/show-more-button-view.js ***!
  \*******************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createShowMoreButtonTemplate": () => (/* binding */ createShowMoreButtonTemplate)
/* harmony export */ });
const createShowMoreButtonTemplate = () => '<button class="films-list__show-more">Show more</button>';

/***/ }),

/***/ "./src/view/sort-view.js":
/*!*******************************!*\
  !*** ./src/view/sort-view.js ***!
  \*******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createSortTemplate": () => (/* binding */ createSortTemplate)
/* harmony export */ });
const createSortTemplate = () => `<ul class="sort">
    <li><a href="#" class="sort__button sort__button--active">Sort by default</a></li>
    <li><a href="#" class="sort__button">Sort by date</a></li>
    <li><a href="#" class="sort__button">Sort by rating</a></li>
  </ul>`;

/***/ }),

/***/ "./src/view/user-info-view.js":
/*!************************************!*\
  !*** ./src/view/user-info-view.js ***!
  \************************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "createUserInfoTemplate": () => (/* binding */ createUserInfoTemplate)
/* harmony export */ });
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ../const */ "./src/const.js");
/* harmony import */ var _util__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ../util */ "./src/util.js");


const createUserInfoTemplate = () => `<section class="header__profile profile">
    <p class="profile__rating">
      ${_const__WEBPACK_IMPORTED_MODULE_0__.USER_RANK[(0,_util__WEBPACK_IMPORTED_MODULE_1__.getRandomInteger)(0, _const__WEBPACK_IMPORTED_MODULE_0__.USER_RANK.length - 1)]}
    </p>
    <img class="profile__avatar" src="images/bitmap@2x.png" alt="Avatar" width="35" height="35">
  </section>`;

/***/ }),

/***/ "./node_modules/dayjs/dayjs.min.js":
/*!*****************************************!*\
  !*** ./node_modules/dayjs/dayjs.min.js ***!
  \*****************************************/
/***/ (function(module) {

!function(t,e){ true?module.exports=e():0}(this,(function(){"use strict";var t=1e3,e=6e4,n=36e5,r="millisecond",i="second",s="minute",u="hour",a="day",o="week",f="month",h="quarter",c="year",d="date",$="Invalid Date",l=/^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,y=/\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,M={name:"en",weekdays:"Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),months:"January_February_March_April_May_June_July_August_September_October_November_December".split("_")},m=function(t,e,n){var r=String(t);return!r||r.length>=e?t:""+Array(e+1-r.length).join(n)+t},g={s:m,z:function(t){var e=-t.utcOffset(),n=Math.abs(e),r=Math.floor(n/60),i=n%60;return(e<=0?"+":"-")+m(r,2,"0")+":"+m(i,2,"0")},m:function t(e,n){if(e.date()<n.date())return-t(n,e);var r=12*(n.year()-e.year())+(n.month()-e.month()),i=e.clone().add(r,f),s=n-i<0,u=e.clone().add(r+(s?-1:1),f);return+(-(r+(n-i)/(s?i-u:u-i))||0)},a:function(t){return t<0?Math.ceil(t)||0:Math.floor(t)},p:function(t){return{M:f,y:c,w:o,d:a,D:d,h:u,m:s,s:i,ms:r,Q:h}[t]||String(t||"").toLowerCase().replace(/s$/,"")},u:function(t){return void 0===t}},D="en",v={};v[D]=M;var p=function(t){return t instanceof _},S=function(t,e,n){var r;if(!t)return D;if("string"==typeof t)v[t]&&(r=t),e&&(v[t]=e,r=t);else{var i=t.name;v[i]=t,r=i}return!n&&r&&(D=r),r||!n&&D},w=function(t,e){if(p(t))return t.clone();var n="object"==typeof e?e:{};return n.date=t,n.args=arguments,new _(n)},O=g;O.l=S,O.i=p,O.w=function(t,e){return w(t,{locale:e.$L,utc:e.$u,x:e.$x,$offset:e.$offset})};var _=function(){function M(t){this.$L=S(t.locale,null,!0),this.parse(t)}var m=M.prototype;return m.parse=function(t){this.$d=function(t){var e=t.date,n=t.utc;if(null===e)return new Date(NaN);if(O.u(e))return new Date;if(e instanceof Date)return new Date(e);if("string"==typeof e&&!/Z$/i.test(e)){var r=e.match(l);if(r){var i=r[2]-1||0,s=(r[7]||"0").substring(0,3);return n?new Date(Date.UTC(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)):new Date(r[1],i,r[3]||1,r[4]||0,r[5]||0,r[6]||0,s)}}return new Date(e)}(t),this.$x=t.x||{},this.init()},m.init=function(){var t=this.$d;this.$y=t.getFullYear(),this.$M=t.getMonth(),this.$D=t.getDate(),this.$W=t.getDay(),this.$H=t.getHours(),this.$m=t.getMinutes(),this.$s=t.getSeconds(),this.$ms=t.getMilliseconds()},m.$utils=function(){return O},m.isValid=function(){return!(this.$d.toString()===$)},m.isSame=function(t,e){var n=w(t);return this.startOf(e)<=n&&n<=this.endOf(e)},m.isAfter=function(t,e){return w(t)<this.startOf(e)},m.isBefore=function(t,e){return this.endOf(e)<w(t)},m.$g=function(t,e,n){return O.u(t)?this[e]:this.set(n,t)},m.unix=function(){return Math.floor(this.valueOf()/1e3)},m.valueOf=function(){return this.$d.getTime()},m.startOf=function(t,e){var n=this,r=!!O.u(e)||e,h=O.p(t),$=function(t,e){var i=O.w(n.$u?Date.UTC(n.$y,e,t):new Date(n.$y,e,t),n);return r?i:i.endOf(a)},l=function(t,e){return O.w(n.toDate()[t].apply(n.toDate("s"),(r?[0,0,0,0]:[23,59,59,999]).slice(e)),n)},y=this.$W,M=this.$M,m=this.$D,g="set"+(this.$u?"UTC":"");switch(h){case c:return r?$(1,0):$(31,11);case f:return r?$(1,M):$(0,M+1);case o:var D=this.$locale().weekStart||0,v=(y<D?y+7:y)-D;return $(r?m-v:m+(6-v),M);case a:case d:return l(g+"Hours",0);case u:return l(g+"Minutes",1);case s:return l(g+"Seconds",2);case i:return l(g+"Milliseconds",3);default:return this.clone()}},m.endOf=function(t){return this.startOf(t,!1)},m.$set=function(t,e){var n,o=O.p(t),h="set"+(this.$u?"UTC":""),$=(n={},n[a]=h+"Date",n[d]=h+"Date",n[f]=h+"Month",n[c]=h+"FullYear",n[u]=h+"Hours",n[s]=h+"Minutes",n[i]=h+"Seconds",n[r]=h+"Milliseconds",n)[o],l=o===a?this.$D+(e-this.$W):e;if(o===f||o===c){var y=this.clone().set(d,1);y.$d[$](l),y.init(),this.$d=y.set(d,Math.min(this.$D,y.daysInMonth())).$d}else $&&this.$d[$](l);return this.init(),this},m.set=function(t,e){return this.clone().$set(t,e)},m.get=function(t){return this[O.p(t)]()},m.add=function(r,h){var d,$=this;r=Number(r);var l=O.p(h),y=function(t){var e=w($);return O.w(e.date(e.date()+Math.round(t*r)),$)};if(l===f)return this.set(f,this.$M+r);if(l===c)return this.set(c,this.$y+r);if(l===a)return y(1);if(l===o)return y(7);var M=(d={},d[s]=e,d[u]=n,d[i]=t,d)[l]||1,m=this.$d.getTime()+r*M;return O.w(m,this)},m.subtract=function(t,e){return this.add(-1*t,e)},m.format=function(t){var e=this,n=this.$locale();if(!this.isValid())return n.invalidDate||$;var r=t||"YYYY-MM-DDTHH:mm:ssZ",i=O.z(this),s=this.$H,u=this.$m,a=this.$M,o=n.weekdays,f=n.months,h=function(t,n,i,s){return t&&(t[n]||t(e,r))||i[n].substr(0,s)},c=function(t){return O.s(s%12||12,t,"0")},d=n.meridiem||function(t,e,n){var r=t<12?"AM":"PM";return n?r.toLowerCase():r},l={YY:String(this.$y).slice(-2),YYYY:this.$y,M:a+1,MM:O.s(a+1,2,"0"),MMM:h(n.monthsShort,a,f,3),MMMM:h(f,a),D:this.$D,DD:O.s(this.$D,2,"0"),d:String(this.$W),dd:h(n.weekdaysMin,this.$W,o,2),ddd:h(n.weekdaysShort,this.$W,o,3),dddd:o[this.$W],H:String(s),HH:O.s(s,2,"0"),h:c(1),hh:c(2),a:d(s,u,!0),A:d(s,u,!1),m:String(u),mm:O.s(u,2,"0"),s:String(this.$s),ss:O.s(this.$s,2,"0"),SSS:O.s(this.$ms,3,"0"),Z:i};return r.replace(y,(function(t,e){return e||l[t]||i.replace(":","")}))},m.utcOffset=function(){return 15*-Math.round(this.$d.getTimezoneOffset()/15)},m.diff=function(r,d,$){var l,y=O.p(d),M=w(r),m=(M.utcOffset()-this.utcOffset())*e,g=this-M,D=O.m(this,M);return D=(l={},l[c]=D/12,l[f]=D,l[h]=D/3,l[o]=(g-m)/6048e5,l[a]=(g-m)/864e5,l[u]=g/n,l[s]=g/e,l[i]=g/t,l)[y]||g,$?D:O.a(D)},m.daysInMonth=function(){return this.endOf(f).$D},m.$locale=function(){return v[this.$L]},m.locale=function(t,e){if(!t)return this.$L;var n=this.clone(),r=S(t,e,!0);return r&&(n.$L=r),n},m.clone=function(){return O.w(this.$d,this)},m.toDate=function(){return new Date(this.valueOf())},m.toJSON=function(){return this.isValid()?this.toISOString():null},m.toISOString=function(){return this.$d.toISOString()},m.toString=function(){return this.$d.toUTCString()},M}(),b=_.prototype;return w.prototype=b,[["$ms",r],["$s",i],["$m",s],["$H",u],["$W",a],["$M",f],["$y",c],["$D",d]].forEach((function(t){b[t[1]]=function(e){return this.$g(e,t[0],t[1])}})),w.extend=function(t,e){return t.$i||(t(e,_,w),t.$i=!0),w},w.locale=S,w.isDayjs=p,w.unix=function(t){return w(1e3*t)},w.en=v[D],w.Ls=v,w.p={},w}));

/***/ }),

/***/ "./node_modules/nanoid/index.dev.js":
/*!******************************************!*\
  !*** ./node_modules/nanoid/index.dev.js ***!
  \******************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "nanoid": () => (/* binding */ nanoid),
/* harmony export */   "customAlphabet": () => (/* binding */ customAlphabet),
/* harmony export */   "customRandom": () => (/* binding */ customRandom),
/* harmony export */   "urlAlphabet": () => (/* reexport safe */ _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__.urlAlphabet),
/* harmony export */   "random": () => (/* binding */ random)
/* harmony export */ });
/* harmony import */ var _url_alphabet_index_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./url-alphabet/index.js */ "./node_modules/nanoid/url-alphabet/index.js");

if (true) {
  if (
    typeof navigator !== 'undefined' &&
    navigator.product === 'ReactNative' &&
    typeof crypto === 'undefined'
  ) {
    throw new Error(
      'React Native does not have a built-in secure random generator. ' +
        'If you don’t need unpredictable IDs use `nanoid/non-secure`. ' +
        'For secure IDs, import `react-native-get-random-values` ' +
        'before Nano ID.'
    )
  }
  if (typeof msCrypto !== 'undefined' && typeof crypto === 'undefined') {
    throw new Error(
      'Import file with `if (!window.crypto) window.crypto = window.msCrypto`' +
        ' before importing Nano ID to fix IE 11 support'
    )
  }
  if (typeof crypto === 'undefined') {
    throw new Error(
      'Your browser does not have secure random generator. ' +
        'If you don’t need unpredictable IDs, you can use nanoid/non-secure.'
    )
  }
}
let random = bytes => crypto.getRandomValues(new Uint8Array(bytes))
let customRandom = (alphabet, size, getRandom) => {
  let mask = (2 << (Math.log(alphabet.length - 1) / Math.LN2)) - 1
  let step = -~((1.6 * mask * size) / alphabet.length)
  return () => {
    let id = ''
    while (true) {
      let bytes = getRandom(step)
      let j = step
      while (j--) {
        id += alphabet[bytes[j] & mask] || ''
        if (id.length === size) return id
      }
    }
  }
}
let customAlphabet = (alphabet, size) => customRandom(alphabet, size, random)
let nanoid = (size = 21) => {
  let id = ''
  let bytes = crypto.getRandomValues(new Uint8Array(size))
  while (size--) {
    let byte = bytes[size] & 63
    if (byte < 36) {
      id += byte.toString(36)
    } else if (byte < 62) {
      id += (byte - 26).toString(36).toUpperCase()
    } else if (byte < 63) {
      id += '_'
    } else {
      id += '-'
    }
  }
  return id
}



/***/ }),

/***/ "./node_modules/nanoid/url-alphabet/index.js":
/*!***************************************************!*\
  !*** ./node_modules/nanoid/url-alphabet/index.js ***!
  \***************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "urlAlphabet": () => (/* binding */ urlAlphabet)
/* harmony export */ });
let urlAlphabet =
  'useandom-26T198340PX75pxJACKVERYMINDBUSHWOLF_GQZbfghjklqvwyzrict'



/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/compat get default export */
/******/ 	(() => {
/******/ 		// getDefaultExport function for compatibility with non-harmony modules
/******/ 		__webpack_require__.n = (module) => {
/******/ 			var getter = module && module.__esModule ?
/******/ 				() => (module['default']) :
/******/ 				() => (module);
/******/ 			__webpack_require__.d(getter, { a: getter });
/******/ 			return getter;
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be in strict mode.
(() => {
"use strict";
/*!*********************!*\
  !*** ./src/main.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _view_user_info_view__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./view/user-info-view */ "./src/view/user-info-view.js");
/* harmony import */ var _view_filter_and_stats_view__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./view/filter-and-stats-view */ "./src/view/filter-and-stats-view.js");
/* harmony import */ var _view_sort_view__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./view/sort-view */ "./src/view/sort-view.js");
/* harmony import */ var _view_movies_section_view__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./view/movies-section-view */ "./src/view/movies-section-view.js");
/* harmony import */ var _view_movie_card_view__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./view/movie-card-view */ "./src/view/movie-card-view.js");
/* harmony import */ var _view_movies_top_rated_view__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./view/movies-top-rated-view */ "./src/view/movies-top-rated-view.js");
/* harmony import */ var _view_movies_most_commented_view__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./view/movies-most-commented-view */ "./src/view/movies-most-commented-view.js");
/* harmony import */ var _view_show_more_button_view__WEBPACK_IMPORTED_MODULE_7__ = __webpack_require__(/*! ./view/show-more-button-view */ "./src/view/show-more-button-view.js");
/* harmony import */ var _view_number_of_films_view__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./view/number-of-films-view */ "./src/view/number-of-films-view.js");
/* harmony import */ var _const__WEBPACK_IMPORTED_MODULE_9__ = __webpack_require__(/*! ./const */ "./src/const.js");
/* harmony import */ var _view_popup_view__WEBPACK_IMPORTED_MODULE_10__ = __webpack_require__(/*! ./view/popup-view */ "./src/view/popup-view.js");
/* harmony import */ var _mock_movie_js__WEBPACK_IMPORTED_MODULE_11__ = __webpack_require__(/*! ./mock/movie.js */ "./src/mock/movie.js");
/* harmony import */ var _render_js__WEBPACK_IMPORTED_MODULE_12__ = __webpack_require__(/*! ./render.js */ "./src/render.js");













const movies = Array.from({
  length: _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT
}, _mock_movie_js__WEBPACK_IMPORTED_MODULE_11__.generateMovie);
const siteHeaderElement = document.querySelector('.header');
const siteMainElement = document.querySelector('.main');
const siteFooterElement = document.querySelector('.footer');
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteHeaderElement, (0,_view_user_info_view__WEBPACK_IMPORTED_MODULE_0__.createUserInfoTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteMainElement, (0,_view_sort_view__WEBPACK_IMPORTED_MODULE_2__.createSortTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.AFTERBEGIN);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteMainElement, (0,_view_filter_and_stats_view__WEBPACK_IMPORTED_MODULE_1__.createFilterAndStatsTemplate)(movies), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.AFTERBEGIN);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteMainElement, (0,_view_movies_section_view__WEBPACK_IMPORTED_MODULE_3__.createMoviesSectionTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
const siteMoviesSectionElement = document.querySelector('.films');
const moviesListElement = siteMainElement.querySelector('.films-list');
const moviesListContainerElement = siteMainElement.querySelector('.films-list__container');

if (movies.length > _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT_PER_STEP) {
  let renderedMovieCount = _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT_PER_STEP;
  (0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(moviesListContainerElement, (0,_view_movie_card_view__WEBPACK_IMPORTED_MODULE_4__.createMovieCardTemplate)(movies.slice(0, _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT_PER_STEP)), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.AFTERBEGIN);
  (0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(moviesListElement, (0,_view_show_more_button_view__WEBPACK_IMPORTED_MODULE_7__.createShowMoreButtonTemplate)(), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
  const showMoreButton = moviesListElement.querySelector('.films-list__show-more');
  showMoreButton.addEventListener('click', evt => {
    evt.preventDefault();
    (0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(moviesListContainerElement, (0,_view_movie_card_view__WEBPACK_IMPORTED_MODULE_4__.createMovieCardTemplate)(movies.slice(renderedMovieCount, renderedMovieCount + _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT_PER_STEP)), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.AFTERBEGIN);
    renderedMovieCount += _const__WEBPACK_IMPORTED_MODULE_9__.MOVIE_COUNT_PER_STEP;

    if (renderedMovieCount >= movies.length) {
      showMoreButton.remove();
    }
  });
}

(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteMoviesSectionElement, (0,_view_movies_top_rated_view__WEBPACK_IMPORTED_MODULE_5__.createMoviesTopRatedTemplate)(movies), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteMoviesSectionElement, (0,_view_movies_most_commented_view__WEBPACK_IMPORTED_MODULE_6__.createMoviesMostCommentedTemplate)(movies), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(siteFooterElement, (0,_view_number_of_films_view__WEBPACK_IMPORTED_MODULE_8__.createNumberOfFilmsTemplate)(movies.length), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
(0,_render_js__WEBPACK_IMPORTED_MODULE_12__.renderTemplate)(moviesListElement, (0,_view_popup_view__WEBPACK_IMPORTED_MODULE_10__.createPopupTemplate)(movies[0]), _render_js__WEBPACK_IMPORTED_MODULE_12__.RenderPosition.BEFOREEND);
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map