import AbstractObservable from '../utils/abstract-observable.js';
import {UpdateType} from '../const.js';

export default class MoviesModel extends AbstractObservable {
  #apiService = null;
  #movies = [];

  constructor(apiService) {
    super();
    this.#apiService = apiService;
  }

  get movies() {
    return this.#movies;
  }

  init = async () => {
    try {
      const movies = await this.#apiService.movies;
      this.#movies = movies.map(this.#adaptToClient);
    } catch(err) {
      this.#movies = [];
    }

    this._notify(UpdateType.INIT);
  }

  updateMovieComments = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      await this.#apiService.getComments(update.id).then((data) => {
        update.commentsData = data;
      });
    } catch(err) {
      throw new Error('Can\'t overwrite comments' `${err}`);
    }

    this._notify(updateType, update);
  }

  updateMovie = async (updateType, update) => {
    const index = this.#movies.findIndex((movie) => movie.id === update.id);

    if (index === -1) {
      throw new Error('Can\'t update unexisting movie');
    }

    try {
      const response = await this.#apiService.updateMovie(update);
      const updatedMovie = this.#adaptToClient(response);

      this.#movies = [
        ...this.#movies.slice(0, index),
        update,
        ...this.#movies.slice(index + 1),
      ];
      this._notify(updateType, updatedMovie);
    } catch(err) {
      throw new Error(`Can\t update movie ${err}`);
    }

    this._notify(updateType, update);
  }

  addComment = async (updateType, update) => {
    try {
      const response = await this.#apiService.addComment(update);
      update.commentsData = response.comments;
      update.comments = response.movie.comments;

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t add comment');
    }
  }

  deleteComment = async (updateType, update) => {
    const index = update.comments.findIndex((comment) => comment === update.commentDel);

    if (index === -1) {
      throw new Error('Can\'t update unexisting comment');
    }

    try {
      await this.#apiService.deleteComment(update.commentDel);
      delete update.commentDel;

      update.commentsData.sort((a, b) => a.id - b.id);

      update.commentsData = [
        ...update.commentsData.slice(0, index),
        ...update.commentsData.slice(index + 1),
      ];
      update.comments = [
        ...update.comments.slice(0, index),
        ...update.comments.slice(index + 1),
      ];

      this._notify(updateType, update);
    } catch(err) {
      throw new Error('Can\'t delete comment');
    }
  }

  #adaptToClient = (movie) => {
    const adaptedMovie = {...movie,
      filmInfo: {...movie['film_info'],
        ageRating: movie['film_info']['age_rating'],
        alternativeTitle: movie['film_info']['alternative_title'],
        totalRating: movie['film_info']['total_rating'],
        genres: movie['film_info']['genre'],
        release: {...movie['film_info']['release'],
          releaseCountry: movie['film_info']['release']['release_country'],
        },
      },
      userDetails: {...movie['user_details'],
        isInWatchlist: movie['user_details']['watchlist'],
        isAlreadyWatched: movie['user_details']['already_watched'],
        watchingDate: movie['user_details']['watching_date'],
        isInFavorite: movie['user_details']['favorite'],
      },
    };

    delete adaptedMovie['film_info'];
    delete adaptedMovie['filmInfo']['age_rating'];
    delete adaptedMovie['filmInfo']['alternative_title'];
    delete adaptedMovie['filmInfo']['total_rating'];
    delete adaptedMovie['filmInfo']['genre'];
    delete adaptedMovie['filmInfo']['release']['release_country'];
    delete adaptedMovie['user_details'];
    delete adaptedMovie['userDetails']['watchlist'];
    delete adaptedMovie['userDetails']['already_watched'];
    delete adaptedMovie['userDetails']['watching_date'];
    delete adaptedMovie['userDetails']['favorite'];

    return adaptedMovie;
  }
}
