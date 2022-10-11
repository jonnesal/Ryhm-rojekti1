const resultsDiv = document.querySelector("#results");
let searchAmount;
let entertainmentName;


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
        const entertainment = document.createElement("a");
        entertainment.href = "searchDetails.html";
        entertainment.className = "entertainment";

        const cover = document.createElement("img");
        cover.src = "https://image.tmdb.org/t/p/original/" + results.results[i].poster_path
        const title = document.createElement("p");
        const description = document.createElement("p");

        //Elokuva    Elokuvassa ja sarjassa pitää hakea eri nimisistä tauluista tietoa tässä se katsoo kumpi on sivulla valittu
        //ja hakee sen perusteella
        if (document.querySelector('input[name="roulette"]:checked').value == 1) {
            title.innerText = results.results[i].original_title;
            cover.alt = "Cover of " + results.results[i].original_title;
            entertainmentName = results.results[i].original_title;

            //Sarja
        } else {
            title.innerText = results.results[i].original_name;
            cover.alt = "Cover of " + results.results[i].original_name;
            entertainmentName = results.results[i].original_name;
        }
        description.innerText = results.results[i].overview;
        let posterPath = results.results[i].poster_path;
        let rating = results.results[i].vote_average;

        cover.style = "width:100%";

        //favorite button
        const favorite = document.createElement("button");
        favorite.innerText = "favorite";

        //tallenetaan kyseisen favoriten tiedot
        favorite.addEventListener("click", () => {
            localStorage.setItem("Results", JSON.stringify(results));
            localStorage.setItem("Position", i);
            putToFavorite(entertainmentName, rating, posterPath);
        });

        resultsDiv.appendChild(entertainment);
        entertainment.appendChild(cover);
        entertainment.appendChild(title);
        //resultsDiv.appendChild(description);
        resultsDiv.appendChild(favorite);


        //tallenetaan tiedot jotta niitä voidaan käyttää searchDetails
        entertainment.addEventListener("click", () => {
            localStorage.setItem("Results", JSON.stringify(results));
            localStorage.setItem("Position", i);
        })

    }


}