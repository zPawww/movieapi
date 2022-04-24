const url = 'https://api.themoviedb.org/3';
const key = 'api_key=52be7738e2816c86bbaa3db3c47cd4c0';
const API_URL = url + '/discover/movie?sort_by=popularity.desc&' + key;
const IMG_URL = 'https://image.tmdb.org/t/p/w500';
const trendingDiv = document.querySelector('.movies__trending');
const div = document.querySelector('.movies__images');
const form = document.querySelector('form');
const SEARCH_URL = url + '/search/movie?' + key;
const button = document.querySelector('.search__icon');
const title = document.querySelector('.text__title__movies');

function getMovies(url) {
  fetch(url)
    .then(response => response.json())
    .then(data => {
      if (data.results[0] == undefined) {
        alert('There are no movies, series with this name');
        title.innerHTML = 'No results!';
        div.innerHTML = '';
      } else {
        let result = data.results;
        div.innerHTML = '';
        result.forEach(element => {
          const release = element.release_date.split('-').join(' > ');
          const data = {
            poster: IMG_URL + element.poster_path,
            date: release,
            name: element.title,
          };
          div.innerHTML += `
          <div class="movies__1">
          <img src="${data.poster}" class="images__movies">
          <p class="text__movie__subtitle">${data.date}</p>
          <h1 class="text__movie__title">${data.name}</h1>
          </div>
          `;
        });
      }
    });
}

function trendingMovies() {
  const url =
    'https://api.themoviedb.org/3/trending/all/day?api_key=52be7738e2816c86bbaa3db3c47cd4c0';
  fetch(url)
    .then(response => response.json())
    .then(data => {
      const results = data.results;
      const moviesData = {
        imageOne: IMG_URL + results[0].poster_path,
        imageTwo: IMG_URL + results[1].poster_path,
        imageThree: IMG_URL + results[2].poster_path,
      };
      trendingDiv.innerHTML += `
      <img
      src="${moviesData.imageOne}"
      alt=""
      class="image__trending"
    />
    <img
    src="${moviesData.imageTwo}"
    alt=""
    class="image__trending"
    />
  <img
  src="${moviesData.imageThree}"
  alt=""
  class="image__trending"
   />
    `;
    });
}
getMovies(API_URL);
trendingMovies();

form.addEventListener('submit', e => {
  e.preventDefault();
  const mainTrending = document.querySelector('.main__trending');
  const main = document.querySelector('.main');
  const value = e.target.search.value;
  const URLSEARCH = SEARCH_URL + '&query=' + value;
  if (value == '') {
    getMovies(API_URL);
  } else {
    getMovies(URLSEARCH);
    title.innerHTML = 'Search Results ' + value;
  }
});
