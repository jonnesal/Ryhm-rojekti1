const searchButton = document.querySelector("#search-button");

searchButton.addEventListener("click", () => {
  console.log("testi");
  searching();
});

/**
 * Generates url from the users given input and saves it to localStorage
 * @param {String} url url is saved here
 */

function searching() {
  let url;
  let specificEntertainment = document.getElementById("entertainmentId").value;

  //Jos halutaan tietyllä nimellä etsiä, input kenttä ei ole tyhjä niin tapahtuu tämä if
  if (specificEntertainment !== "") {
    url = `https://api.themoviedb.org/3/search/multi?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&language=en-US&query=${specificEntertainment}&page=1&include_adult=false`;
    localStorage.setItem("Searchurl", url);
    location.href = "../html/search.html";
  } else {
    console.log("Leffaa/sarjaa ei löytynyt!");
  }
}
