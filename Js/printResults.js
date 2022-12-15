const resultsDiv = document.querySelector(".imageplaceholder");
let searchAmount;
let typeValue;

// ***********
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("loggedIn") == "true") {
    console.log("hide buttons");
    hideButtons();
  } else {
    console.log("show buttons");
    showButtons();
  }
});

function hideButtons() {
  document.getElementById("login").style.display = "none";
  document.getElementById("register").style.display = "none";
}

function showButtons() {
  document.getElementById("favorites").style.display = "none";
  document.getElementById("login").style.display = "unset";
  document.getElementById("register").style.display = "unset";
}

/**
 * Fetches data and amount
 * @param {String} url Url where to fetch
 * @param {Number} Amount Amount of results
 */
const searchUrl = (url, Amount, type) => {
  searchAmount = Amount;
  typeValue = type;
  fetch(url)
    .then((response) => response.json())
    .then((results) => printResults(results))
    .catch((error) => console.log(error));
};

/**
 * Prints results to the page and favorite button
 * @param {JSON} results Fetched api results
 */

const printResults = (results) => {
  resultsDiv.innerHTML = ``;

  for (let i = 0; i < searchAmount; i++) {
    const entertainmentdiv = document.createElement("div");
    const entertainment = document.createElement("a");
    entertainment.className = "entertainment";

    const cover = document.createElement("img");
    entertainmentdiv.setAttribute("id", "entertainmentDiv");
    cover.src =
      "https://image.tmdb.org/t/p/original/" + results.results[i].poster_path;
    cover.setAttribute("id", "cover");

    let mediaId = results.results[i].id;

    //Elokuva    Elokuvassa ja sarjassa pitää hakea eri nimisistä tauluista tietoa tässä se katsoo kumpi on sivulla valittu
    //ja hakee sen perusteella
    if (typeValue == 1) {
      cover.alt = "Cover of " + results.results[i].original_title;
      entertainment.href = "https://www.themoviedb.org/movie/" + mediaId;

      //Sarja
    } else {
      cover.alt = "Cover of " + results.results[i].original_name;
      entertainment.href = "https://www.themoviedb.org/tv/" + mediaId;
    }
    entertainment.setAttribute("target", "_blank");

    cover.style = "width:100%";

    //favorite button
    const favorite = document.createElement("button");
    favorite.setAttribute("id", "favorite_roulette");
    favorite.innerText = "Favorite";

    //tallenetaan kyseisen favoriten tiedot
    favorite.addEventListener("click", () => {
      event.preventDefault();
      putToFavorite(JSON.stringify(results), i, typeValue);
    });

    resultsDiv.appendChild(entertainmentdiv);
    entertainmentdiv.appendChild(entertainment);
    entertainment.appendChild(cover);
    entertainmentdiv.appendChild(favorite);
  }
};
