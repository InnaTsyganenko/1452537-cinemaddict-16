export const formatRunTime = (runtime) => {
  let result = runtime;
  const runTimeInHours = Math.floor(runtime / 60);
  const minutes = runtime - (runTimeInHours * 60);
  if (runTimeInHours >= 1 && minutes >= 1) {
    result = `${runTimeInHours}h ${minutes}m`;
  } else if (runTimeInHours === 0) {
    result = `${minutes}m`;
  } else if (minutes === 0) {
    result = `${runTimeInHours}h`;
  }
  return result;
};

export const isMovieInWatchlist = (movie) => movie.userDetails.isInWatchlist;
export const isMovieAlreadyWatched = (movie) => movie.userDetails.isAlreadyWatched;
export const isMovieInFavorite = (movie) => movie.userDetails.isInFavorite;
