import dayjs from 'dayjs';
import isToday from 'dayjs/plugin/isToday';
import Chart from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import SmartView from './smart-view.js';

dayjs.extend(isToday);


const renderStatsChart = (moviesByGenreCtx, data) => {
  const {movies} = data;
  const BAR_HEIGHT = 50;
  const allGenre = movies.map((movie) => movie.filmInfo.genres).flat();
  const uniqGenre = [...new Set(allGenre)].length;
  moviesByGenreCtx.height = BAR_HEIGHT * uniqGenre;

  const countGenre = JSON.stringify(
    allGenre.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {}), null, 2);

  const sortingByCount = Object.entries(JSON.parse(countGenre)).sort((a, b) => b[1] - a[1]);

  return new Chart(moviesByGenreCtx, {
    plugins: [ChartDataLabels],
    type: 'horizontalBar',
    data: {
      labels: Array.from(sortingByCount.map((arr) => arr[0])),
      datasets: [{
        data: Array.from(sortingByCount.map((arr) => arr[1])),
        backgroundColor: '#ffe800',
        hoverBackgroundColor: '#ffe800',
        anchor: 'start',
        barThickness: 24,
      }],
    },
    options: {
      responsive: false,
      plugins: {
        datalabels: {
          font: {
            size: 20,
          },
          color: '#ffffff',
          anchor: 'start',
          align: 'start',
          offset: 40,
        },
      },
      scales: {
        yAxes: [{
          ticks: {
            fontColor: '#ffffff',
            padding: 100,
            fontSize: 20,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
        xAxes: [{
          ticks: {
            display: false,
            beginAtZero: true,
          },
          gridLines: {
            display: false,
            drawBorder: false,
          },
        }],
      },
      legend: {
        display: false,
      },
      tooltips: {
        enabled: false,
      },
    },
  });
};

const createStatisticsTemplate = (userRank, userSrcImg, data, filterStats) => {
  const {movies} = data;
  const commonDuration = movies.reduce((a, b) => a + b.filmInfo.runtime, 0);
  const allGenre = movies.map((movie) => movie.filmInfo.genres).flat();

  const countGenre = JSON.stringify(
    allGenre.reduce((acc, el) => {
      acc[el] = (acc[el] || 0) + 1;
      return acc;
    }, {}), null, 2);

  const findTopGenre = (genres) => {
    let genreValues = Object.values(genres)[0];
    let genreKeys = Object.keys(genres)[0];

    for (const [key, value] of Object.entries(genres)) {
      if (value > genreValues){
        genreValues = value;
        genreKeys = key;
      }
    }
    return genreKeys;
  };

  return `<section class="statistic">
  <p class="statistic__rank">
    Your rank
    <img class="statistic__img" src="${userSrcImg}" alt="Avatar" width="35" height="35">
    <span class="statistic__rank-label">${userRank}</span>
  </p>

  <form action="https://echo.htmlacademy.ru/" method="get" class="statistic__filters">
    <p class="statistic__filters-description">Show stats:</p>

    ${filterStats.map((filter) => `<input type="radio" class="statistic__filters-input visually-hidden" name="statistic-filter" id="statistic-${filter.type}" value="${filter.type}" ${filter.type === 'all-time' ? 'checked' : ''}>
    <label for="statistic-${filter.type}" class="statistic__filters-label">${filter.name}</label>`).join('')}
  </form>

  <ul class="statistic__text-list">
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">You watched</h4>
      <p class="statistic__item-text">${movies.length} <span class="statistic__item-description">movies</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Total duration</h4>
      <p class="statistic__item-text">${Math.floor(commonDuration / 60)} <span class="statistic__item-description">h</span> ${commonDuration % 60} <span class="statistic__item-description">m</span></p>
    </li>
    <li class="statistic__text-item">
      <h4 class="statistic__item-title">Top genre</h4>
      <p class="statistic__item-text">${findTopGenre(JSON.parse(countGenre)) === undefined ? '' : findTopGenre(JSON.parse(countGenre))}</p>
    </li>
  </ul>

  <div class="statistic__chart-wrap">
    <canvas class="statistic__chart" width="1000"></canvas>
  </div>

</section>`;
};

export default class StatsView extends SmartView {
  #userRank = null;
  #userSrcImg = null;
  #moviesByGenreChart = null;

  constructor(userRank, userSrcImg, movies) {
    super();
    this.#userRank = userRank;
    this.#userSrcImg = userSrcImg;

    this._data = { movies };
    this._origData = { movies };

    this.#setCharts();
    this.#setStatsFilterClickHandler();
  }

  get template() {
    return createStatisticsTemplate(this.#userRank, this.#userSrcImg, this._data, this.#getFilterStats());
  }

  #getFilterStats = () => [
    {
      type: 'all-time',
      name: 'All time'
    },
    {
      type: 'today',
      name: 'Today'
    },
    {
      type: 'week',
      name: 'Week'
    },
    {
      type: 'month',
      name: 'Month'
    },
    {
      type: 'year',
      name: 'Year'
    },
  ]

  #setStatsFilterClickHandler = (callback) => {
    this._callback.statsFilterClick = callback;
    this.element.querySelectorAll('.statistic__filters-input').forEach((item) => item.addEventListener('change', this.#statsFilterClickHandler));
  }

  #statsFilterClickHandler = (evt) => {
    evt.preventDefault();
    let {movies} = this._origData;
    switch(evt.target.value) {
      case 'today':
        movies = movies.filter((movie) => dayjs(movie.userDetails.watchingDate).isToday());
        break;
      case 'week':
        movies = movies.filter((movie) => dayjs().diff((movie.userDetails.watchingDate), 'week') <= 1);
        break;
      case 'month':
        movies = movies.filter((movie) => dayjs().diff((movie.userDetails.watchingDate), 'month') <= 1);
        break;
      case 'year':
        movies = movies.filter((movie) => dayjs().diff((movie.userDetails.watchingDate), 'year') <= 1);
        break;
    }

    this.updateData(this._data = {movies});
    const item = this.element.querySelector(`[value=${evt.target.value}]`);

    if (item !== null) {
      item.checked = true;
    }
  }

  restoreHandlers = () => {
    this.#setCharts();
    this.#setStatsFilterClickHandler();
  }

  #setCharts = () => {
    const moviesByGenreCtx = this.element.querySelector('.statistic__chart');
    this.#moviesByGenreChart = renderStatsChart(moviesByGenreCtx, this._data);
  }
}
