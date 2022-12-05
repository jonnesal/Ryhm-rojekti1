const resultsDiv = document.querySelector("#results");
const url = localStorage.getItem("Searchurl");
let searchAmount;

window.onload = function() {
    console.log(url);
    searchUrl(url, 10)
}

const searchUrl = (url, Amount) => {
    searchAmount = Amount;
    fetch(url)
        .then(response => response.json())
        .then(results => printResults(results))
        .catch(error => console.log(error));
}

const printResults = (results) => {
    resultsDiv.innerHTML = ``;

    for (let i = 0; i < searchAmount; i++) {
        const entertainmentdiv = document.createElement("div");
        entertainmentdiv.setAttribute("id", "entertainmentDiv");

        const entertainment = document.createElement("a");
        entertainment.className = "entertainment";

        let mediaId = results.results[i].id;
        if (results.results[i].media_type == "movie") {

            entertainment.href = 'https://www.themoviedb.org/movie/' + mediaId;
        } else {
            entertainment.href = 'https://www.themoviedb.org/tv/' + mediaId;
        }


        const cover = document.createElement("img");
        cover.src = "https://image.tmdb.org/t/p/original/" + results.results[i].poster_path
        cover.setAttribute("id", "cover");
        cover.style = "width:15%";

        const favorite = document.createElement("button");
        favorite.setAttribute("id", "favorite");
        favorite.innerText = "Favorite";

        favorite.addEventListener("click", () => {

            putToFavorite(JSON.stringify(results), i, 1);
        });



        resultsDiv.appendChild(entertainmentdiv);
        entertainmentdiv.appendChild(entertainment);
        entertainmentdiv.appendChild(favorite);
        entertainment.appendChild(cover);
    }

}