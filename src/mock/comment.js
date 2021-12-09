import dayjs from 'dayjs';
import {nanoid} from 'nanoid';
import {getRandomInteger, getRandomArrayElements} from '../utils/common';
import {EMOTIONS, TEXT} from '../const';

const generateCommentAuthor = () => {
  const titles = [
    'John Doe',
    'Jane Doe',
    'Вася Пупкин',
    'Марьиванна',
  ];
  const randomIndex = getRandomInteger(0, titles.length - 1);

  return titles[randomIndex];
};

export const generateComment = () => ({
  id: nanoid(),
  author: generateCommentAuthor(),
  comment: getRandomArrayElements(TEXT, 1),
  date: dayjs().subtract(getRandomInteger(0, 5000), 'day'),
  emotion: EMOTIONS[getRandomInteger(0, EMOTIONS.length - 1)],
});
