const resultsDiv = document.querySelector("#results");
let searchAmount;



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

        if (document.querySelector('input[name="roulette"]:checked').value == 1) {
            title.innerText = results.results[i].original_title;
            cover.alt = "Cover of " + results.results[i].original_title;
        } else {
            title.innerText = results.results[i].original_name;
            cover.alt = "Cover of " + results.results[i].original_name;
        }

        cover.style = "width:100%";

        resultsDiv.appendChild(entertainment);
        entertainment.appendChild(cover);
        entertainment.appendChild(title);

        entertainment.addEventListener("click", () => {
            localStorage.setItem("Results", JSON.stringify(results));
            localStorage.setItem("Position", i);
        })

    }


}