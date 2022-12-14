//const position = localStorage.getItem("Position");
const typevalue = localStorage.getItem("type");
const favButton = document.querySelector("#favorites_search");

let favCount = 1; // how many favorites the current user has
let userID;

// call loadFavorites() when page has loaded
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

function hideButtons() {
  document.getElementById("favorites").style.display = "none";
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
}

function showButtons() {
  document.getElementById("login").style.display = "unset";
  document.getElementById("register").style.display = "unset";
}

function loadFavorites() {
  getFavoritesCount();
  getFavorites();
}

// insert a movie/series to the database
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

// Get all favorites from current user
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

// Get the number of favorite movies/series from the current user
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

// -------------- Print favorites to page --------------------------
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

// Poistamistoiminto testauksia varten
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

function testFavorite(testNumber, data) {
  if (testNumber == 1) {
    return putToFavorite(data);
  } else {
    return deleteFromDatabase(data, true);
  }
}
module.exports = testFavorite;
