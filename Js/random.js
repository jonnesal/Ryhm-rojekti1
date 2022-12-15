const randomizeButton = document.querySelector("#roulette_search");
let score;
let url;
let type;
searchAmount = 1;

//genret listattuna josta arvotaan yksi
const genres = [
  { id: 28, name: "Action" },
  { id: 12, name: "Adventure" },
  { id: 16, name: "Animation" },
  { id: 35, name: "Comedy" },
  { id: 80, name: "Crime" },
  { id: 99, name: "Documentary" },
  { id: 18, name: "Drama" },
  { id: 10751, name: "Family" },
  { id: 14, name: "Fantasy" },
  { id: 36, name: "History" },
  { id: 27, name: "Horror" },
  { id: 10402, name: "Music" },
  { id: 9648, name: "Mystery" },
  { id: 10749, name: "Romance" },
  { id: 878, name: "Science Fiction" },
  { id: 10770, name: "TV Movie" },
  { id: 53, name: "Thriller" },
  { id: 10752, name: "War" },
  { id: 37, name: "Western" },
];

randomizeButton.addEventListener("click", () => {
  generate();
});

/**
 * Generates url and sends it to printresults
 * @param {String} url Sends url to printResults()
 */

function generate() {
  let url = randomize();
  searchUrl(url, searchAmount, type);
}

/**
 * Generates randomized fetch url for api
 * @param {Number} score Contains minimum movie/series rating
 * @returns url to the generate()
 */
function randomize() {
  score = 8;

  //arpoo 1-300 jonkun sivuston
  let page = Math.floor(Math.random() * 300) + 1;

  //kattoo onko käyttäjä valinnut leffan vai sarjan
  let value = document.querySelector('input[name="roulette"]:checked').value;

  if (value == 1) {
    url = `https://api.themoviedb.org/3/discover/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&page=${page}&vote_average.gte=${score}&include_adult=false`;
    type = value;
    return url;
  } else {
    url = `https://api.themoviedb.org/3/discover/tv?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&page=${page}&vote_average.gte=${score}&include_adult=false`;
    type = value;
    return url;
  }
}
