export const RenderPosition = {
  BEFOREBEGIN: 'beforebegin',
  AFTERBEGIN: 'afterbegin',
  BEFOREEND: 'beforeend',
  AFTEREND: 'afterend',
};


export const render = (container, element, place) => {
  switch (place) {
    case RenderPosition.BEFOREBEGIN:
      container.before(element);
      break;
    case RenderPosition.AFTERBEGIN:
      container.prepend(element);
      break;
    case RenderPosition.BEFOREEND:
      container.append(element);
      break;
    case RenderPosition.AFTEREND:
      container.after(element);
      break;
  }
};

export const createElement = (template) => {
  const newElement = document.createElement('div'); // 1
  newElement.innerHTML = template; // 2

  return newElement.firstChild; // 3
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
