export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};

export const renderTemplate = (container, template, place) => {
  container.insertAdjacentHTML(place, template);
};

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
