const typevalue = localStorage.getItem("type");

let favCount = 1; // how many favorites the current user has

/**
 * Call loadFavorites() when page has loaded
 * Check if user has logged in. If so call hideButtons()
 * If not call showButtons()
 */
document.addEventListener("DOMContentLoaded", () => {
  loadFavorites();

  if (localStorage.getItem("loggedIn") == "true") {
    console.log("hide buttons");
    hideButtons();
  } else {
    console.log("show buttons");
    showButtons();
  }
});

/**
 * Function that is called if you are logged in
 * Hides login and register button and shows favorites
 */
function hideButtons() {
	document.getElementById("login").style.display = "none";
	document.getElementById("register").style.display = "none";
	document.getElementById("favorites").style.display = "unset";
	document.getElementById("logOut").style.display = "unset";
}

/**
 * Function that is called if you are not logged in
 * Shows login and register button and hides favorites and log out button
 */
function showButtons() {
	document.getElementById("login").style.display = "unset";
	document.getElementById("register").style.display = "unset";
	document.getElementById("favorites").style.display = "none";
	document.getElementById("logOut").style.display = "none";
}

/**
 * Calls getFavoritesCount() and getFavorites() functions after the page has loaded
 */
function loadFavorites() {
  getFavoritesCount();
  getFavorites();
}

/**
 * Sends a request to insert a movie/series to the database
 * 
 * @param {JSON} result compiled result from api fetch
 * @param {Number} position So we know which movie/series are going to be put in favorites
 * @param {Number} typevalue Whether it is a series or a movie
 * @returns responseText from the request
 */
function putToFavorite(result, position, typevalue) {
  let results;
  let Name;
  let Rating;
  let posterPath;

  if (result.test == true) {
    Name = result.name;
    Rating = result.rate;
    posterPath = result.posterpath;
  } else {
    results = JSON.parse(result);
    if (typevalue == 1) {
      Name = results.results[position].original_title;
    } else {
      Name = results.results[position].original_name;
    }

    Rating = results.results[position].vote_average;
    posterPath = results.results[position].poster_path;
  }

  let dateAdded = new Date().toISOString().slice(0, 10);

  const data = {
    name: Name,
    rating: Rating,
    dateAdded: dateAdded,
    posterPath: posterPath,
  };

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "http://localhost:8080/api/favorites", false);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {};

  let eventString = JSON.stringify(data);
  xhr.send(eventString);
  return xhr.responseText;
}

/**
 * Sends a request to get all favorites from current user
 */
function getFavorites() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/getFavoritesFromCurrentUser");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        let response = xhr.response;
        let parsedResponse = JSON.parse(response);

        printResults2(parsedResponse);
      }
    }
  };
  xhr.send();
}

/**
 * Sends a request to get the number of favorite movies/series from the current user
 */
function getFavoritesCount() {
  let xhr = new XMLHttpRequest();
  xhr.open("GET", "http://localhost:8080/api/CountFavorites");
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {
    if (xhr.readyState === xhr.DONE) {
      if (xhr.status === 200) {
        let response = xhr.response;
        let parsedResponse = JSON.parse(response);

        favCount = parsedResponse.rowCount;
        console.log("favCount: " + favCount);
      }
    }
  };
  xhr.send();
}


/**
 * Prints the favorites to page
 * @param {JSON} result compiled result from api fetch
 */
const printResults2 = (result) => {
  const favResultsDiv = document.querySelector("#favResults");

  let searchAmount = favCount;
  console.log("searchAmount: " + searchAmount);
  favResultsDiv.innerHTML = ``;

  for (let i = 0; i < searchAmount; i++) {
    const container = document.createElement("div");
    container.setAttribute("id", "container");

    const cover = document.createElement("img");
    cover.src = "https://image.tmdb.org/t/p/original/" + result[i].imageURL;
    cover.setAttribute("class", "cover");

    const title = document.createElement("p");
    title.setAttribute("class", "title");
    title.innerText = result[i].name;

    const delFavorite = document.createElement("button");
    delFavorite.setAttribute("class", "deleteFavorite");
    delFavorite.innerText = "Delete";
    delFavorite.onclick = function () {
      deleteFromDatabase(title.innerHTML);
      window.location.reload();
    };

    favResultsDiv.appendChild(container);
    container.appendChild(cover);
    container.appendChild(delFavorite);
  }
};

/**
 * Poistamistoiminto testauksia varten
 * @param {String} name Name of a movie or series
 * @param {Boolean} test Boolean for tests
 * @returns responseText from the request
 */
function deleteFromDatabase(name, test) {
  const data = {
    name: name,
    test: test,
  };
  let xhr = new XMLHttpRequest();
  xhr.open("DELETE", "http://localhost:8080/api/favorites", false);
  xhr.setRequestHeader("Accept", "application/json");
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.onload = function () {};

  let eventString = JSON.stringify(data);
  xhr.send(eventString);
  return xhr.responseText;
}

/**
 * Tests if adding movie/series to database works
 * Tests if deleting movie/series from favorites works
 * @param {Number} testNumber Defines what functions are being tested
 * @param {JSON} data Gives specific values for testing purposes
 * @returns responseText from the putToFavorite() request
 */
function testFavorite(testNumber, data) {
  if (testNumber == 1) {
    return putToFavorite(data);
  } else {
    return deleteFromDatabase(data, true);
  }
}
module.exports = testFavorite;
