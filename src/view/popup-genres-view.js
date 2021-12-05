export const createPopupGenresTemplate = (genres) => [...new Set(genres)].sort().map((genre) => `<span class="film-details__genre">${genre}</span>`).join('\n');
