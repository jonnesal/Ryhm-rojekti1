const advancedButton = document.querySelector("#questions_search");
searchAmount = 10;
type = null;

advancedButton.addEventListener("click", () => {

    generate();

})



function generate() {
    let url;
    let typevalue = document.querySelector('input[name="type"]:checked').value;
    let genrevalue = document.querySelector('input[name="genre"]:checked').value;

    let voteaverage = Number(document.getElementById('vote_average_gte').value);


    //type check
    if (typevalue == 1) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&vote_count.gte=100`;
        type = typevalue;
    } else if (typevalue == 2) {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&vote_count.gte=100`;
        type = typevalue;

        //Jos käyttäjä ei valitse mitään tyyppiä, se arvotaan käyttäjälle
    } else {
        const rndInt = Math.floor(Math.random() * 2) + 1
        if (rndInt == 1) {
            url = `https://api.themoviedb.org/3/discover/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&vote_count.gte=100`;
            type = typevalue;
        } else {
            `https://api.themoviedb.org/3/discover/tv?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&vote_count.gte=100`;
            type = typevalue;
        }

    }

    //genre check
    if (genrevalue == 1) {
        url += `&with_genres=28`;
    } else if (genrevalue == 2) {
        url += `&with_genres=12`;
    } else if (genrevalue == 3) {
        url += `&with_genres=16`;
    } else if (genrevalue == 4) {
        url += `&with_genres=35`;
    } else if (genrevalue == 5) {
        url += `&with_genres=18`;
    } else if (genrevalue == 6) {
        url += `&with_genres=14`;
    } else if (genrevalue == 7) {
        url += `&with_genres=27`;
    } else if (genrevalue == 8) {
        url += `&with_genres=10402`;
    } else if (genrevalue == 9) {
        url += `&with_genres=53`;
    } else {
        url += ``;
    }

    if (voteaverage != null && typeof voteaverage === 'number') {
        url += '&vote_average.gte=' + voteaverage;
    }

    console.log(url);
    localStorage.setItem("Searchurl", url);
    localStorage.setItem("typevalueforsearch", typevalue);
    location.href = "../html/search.html";


}