const Method = {
  GET: 'GET',
  PUT: 'PUT',
};

export default class ApiService {
  #endPoint = null;
  #authorization = null;

  constructor(endPoint, authorization) {
    this.#endPoint = endPoint;
    this.#authorization = authorization;
  }

  get movies() {
    return this.#load({url: 'movies'})
      .then(ApiService.parseResponse);
  }

  getComments = async (movieId) => {
    const response = await this.#load({
      url: `comments/${movieId}`,
      method: Method.GET,
    });

    const parsedResponse = await ApiService.parseResponse(response);

    return parsedResponse;
  }

  updateMovie = async (movie) => {
    const response = await this.#load({
      url: `movies/${movie.id}`,
      method: Method.PUT,
      body: JSON.stringify(this.#adaptToServer(movie)),
      headers: new Headers({'Content-Type': 'application/json'}),
    });

    const parsedResponse = await ApiService.parseResponse(response);
    return parsedResponse;
  }

  #load = async ({
    url,
    method = Method.GET,
    body = null,
    headers = new Headers(),
  }) => {
    headers.append('Authorization', this.#authorization);

    const response = await fetch(
      `${this.#endPoint}/${url}`,
      {method, body, headers},
    );

    try {
      ApiService.checkStatus(response);
      return response;
    } catch (err) {
      ApiService.catchError(err);
    }
  }

  #adaptToServer = (movie) => {
    const adaptedMovie = {...movie,
      'film_info': {...movie.filmInfo,
        'age_rating': movie.filmInfo.ageRating,
        'alternative_title': movie.filmInfo.alternativeTitle,
        'total_rating': movie.filmInfo.totalRating,
        'genre': movie.filmInfo.genres,
        'release': {...movie.filmInfo.release,
          'release_country': movie.filmInfo.release.releaseCountry,
        },
      },
      'user_details': {...movie.userDetails,
        'watchlist': movie.userDetails.isInWatchlist,
        'already_watched': movie.userDetails.isAlreadyWatched,
        'watching_date': movie.userDetails.watchingDate,
        'favorite': movie.userDetails.isInFavorite,
      },
    };

    delete adaptedMovie.commentsData;
    delete adaptedMovie.filmInfo;
    delete adaptedMovie['film_info'].ageRating;
    delete adaptedMovie['film_info'].alternativeTitle;
    delete adaptedMovie['film_info'].totalRating;
    delete adaptedMovie['film_info'].genres;
    delete adaptedMovie['film_info'].release.releaseCountry;
    delete adaptedMovie.userDetails;
    delete adaptedMovie['user_details'].isInWatchlist;
    delete adaptedMovie['user_details'].isAlreadyWatched;
    delete adaptedMovie['user_details'].watchingDate;
    delete adaptedMovie['user_details'].isInFavorite;

    return adaptedMovie;
  }

  static parseResponse = (response) => response.json();

  static checkStatus = (response) => {
    if (!response.ok) {
      throw new Error(`${response.status}: ${response.statusText}`);
    }
  }

  static catchError = (err) => {
    throw err;
  }
}
