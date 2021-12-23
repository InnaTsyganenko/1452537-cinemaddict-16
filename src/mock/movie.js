import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomArrayElements, getRandomArbitrary} from '../utils/common';
import {generateComment} from '../mock/comment';
import {TEXT} from '../const';

const COMMENT_COUNT = 10;

const comments = Array.from({length: COMMENT_COUNT}, generateComment);

const generateMovieTitle = () => {
  const titles = [
    'Ветреная река',
    'Во все тяжкие',
    'Шпион',
    'Один дома',
    'Джон Уик',
    'Друзья',
    'Гравити Фолз',
    'Вспоминая титанов',
    'Опасные пассажиры поезда 123',
    'Достать ножи',
    'Дежавю',
    'Гнев',
    'Помни меня',
    'Тёмный рыцарь',
    'Законопослушный гражданин',
    'Три билборда на границе Эббинга, Миссури',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

const generateMoviePoster = () => {
  const posters = [
    './images/posters/made-for-each-other.png',
    './images/posters/popeye-meets-sinbad.png',
    './images/posters/sagebrush-trail.jpg',
    './images/posters/santa-claus-conquers-the-martians.jpg',
    './images/posters/the-dance-of-life.jpg',
    './images/posters/the-great-flamarion.jpg',
    './images/posters/the-man-with-the-golden-arm.jpg',
  ];
  const randomIndex = getRandomInteger(0, posters.length - 1);

  return posters[randomIndex];
};

const generateMovieWriters = () => {
  const writers = [
    'Haruki Murakami',
    'Colson Whitehead',
    'Donna Tartt',
    'Hanya Yanagihara',
    'Ann Patchett',
    'Chimamanda Ngozi Adichie',
    'Arundhati Roy',
    'Zadie Smith',
  ];

  return getRandomArrayElements(writers, 1);
};

const generateMovieDirector = () => {
  const directors = [
    'Christopher Nolan',
    'Stanley Kubrick',
    'Quentin Tarantino',
    'Steven Spielberg',
    'Akira Kurosawa',
    'Martin Scorsese',
  ];
  const randomIndex = getRandomInteger(0, directors.length - 1);

  return directors[randomIndex];
};

const generateMovieGenres = () => {
  const genres = [
    'Drama',
    'Comedy',
    'Serial',
    'Romance',
    'Comedy',
    'Detective',
    'Thriller',
    'Crime',
    'Horror',
    'Animated film',
    'Sitcom',
    'Short film',
    'Documentary',
  ];
  return getRandomArrayElements(genres, 1);
};

const generateMovieReleaseCountry = () => {
  const country = [
    'Finland',
    'Russia',
    'USA',
    'Germany',
    'France',
    'Japan',
  ];
  const randomIndex = getRandomInteger(0, country.length - 1);

  return country[randomIndex];
};

export const generateMovie = () => {
  const isAlreadyWatched = Boolean(getRandomInteger(0, 1));
  const watchingDate = isAlreadyWatched
    ? dayjs().subtract(getRandomInteger(0, 5000), 'day')
    : null;

  return {
    id: nanoid(),
    comments: getRandomArrayElements(comments, 0),
    filmInfo: {
      title: generateMovieTitle(),
      alternativeTitle: generateMovieTitle(),
      totalRating: getRandomArbitrary(1, 10).toFixed(1),
      poster: generateMoviePoster(),
      ageRating: getRandomInteger(0, 18),
      director: generateMovieDirector(),
      writers: generateMovieWriters(),
      actors: generateMovieWriters(),
      release: {
        date: dayjs().subtract(getRandomInteger(0, 5000), 'day'),
        releaseCountry: generateMovieReleaseCountry(),
      },
      runtime: getRandomInteger(2, 200),
      genres: generateMovieGenres(),
      description: getRandomArrayElements(TEXT, 1).join(''),
    },
    userDetails: {
      isInWatchlist: Boolean(getRandomInteger(0, 1)),
      isAlreadyWatched,
      watchingDate,
      isInFavorite: Boolean(getRandomInteger(0, 1)),
    },
  };
};
