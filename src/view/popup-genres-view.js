export const createPopupGenresTemplate = (genres) => [...new Set(genres)].map((genre) => `<span class="film-details__genre">${genre}</span>`).join('\n');
