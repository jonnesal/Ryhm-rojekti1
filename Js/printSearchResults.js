const resultsDiv = document.querySelector("#results");
const url = localStorage.getItem("Searchurl");
let searchAmount;
let typevalue2 = localStorage.getItem("typevalueforsearch");
let currentPage = 1;
let booleanTest = false;
const searchDiv = document.querySelector("#prevAndNextButtons");
let searched = 0;
let newUrl;

window.onload = function() {
    currentPage = 1;
    searchUrl(url, 10)
}

const searchUrl = async (url, Amount, test) => {
    if (test === true) {
        booleanTest = true;
        newUrl = ''
        newUrl += url + '&page=' + 1;
        console.log(newUrl);

        fetch(newUrl)
            .then(response => response.json())
            .then(results => {
                return JSON.stringify(results);
            })
            .catch(error => console.log(error));

    } else {


        newUrl = ''
        newUrl += url + '&page=' + currentPage;
        console.log(newUrl);
        searchAmount = Amount;
        fetch(newUrl)
            .then(response => response.json())
            .then(results => printResults(results))
            .catch(error => console.log(error));
    }
}

const printResults = (results) => {
    resultsDiv.innerHTML = ``;
    searchDiv.innerHTML = ``;

    let totalPages = Math.ceil(results.total_pages);


    for (let i = 0 + searched; i < searchAmount + searched; i++) {
        if (results.results[i] != null) {
            searched++;
            const entertainmentdiv = document.createElement("div");
            entertainmentdiv.setAttribute("id", "entertainmentDiv");

            const entertainment = document.createElement("a");
            entertainment.className = "entertainment";

            let mediaId = results.results[i].id;
            if (results.results[i].media_type == "movie" || typevalue2 == 1) {

                entertainment.href = 'https://www.themoviedb.org/movie/' + mediaId;
            } else {
                entertainment.href = 'https://www.themoviedb.org/tv/' + mediaId;
            }


            const cover = document.createElement("img");
            cover.src = "https://image.tmdb.org/t/p/original/" + results.results[i].poster_path
            cover.setAttribute("id", "cover");

            const favorite = document.createElement("button");
            favorite.setAttribute("id", "favorite");
            favorite.innerText = "Favorite";

            favorite.addEventListener("click", () => {
                event.preventDefault();
                putToFavorite(JSON.stringify(results), i, 1);
            });



            resultsDiv.appendChild(entertainmentdiv);
            entertainmentdiv.appendChild(entertainment);
            entertainment.appendChild(favorite);
            entertainment.appendChild(cover);

        } else {
            searched = 0;
            currentPage++;
            break;
        }
    }

    const buttonElements = document.createElement("div");
    buttonElements.className = "buttonElements";

    const previous = document.createElement("button");
    previous.innerText = "Previous";
    previous.className = "previousButton"

    const next = document.createElement("button");
    next.innerText = "Next";
    next.className = "nextButton"

    searchDiv.appendChild(buttonElements);
    buttonElements.appendChild(previous);
    buttonElements.appendChild(next);


    previous.addEventListener("click", () => {
        if (currentPage - 1 > 1) {
            currentPage = currentPage - 2;
            console.log(currentPage);
            searchUrl(url, searchAmount);
        }
    })


    next.addEventListener("click", () => {
        if (currentPage < totalPages + 1) {
            searchUrl(url, searchAmount);
        }
    })

}

module.exports = searchUrl;