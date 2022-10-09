const position = localStorage.getItem("Position");
const results = JSON.parse(localStorage.getItem("Results"));


function putToFavorite(entertainmentName) {


    let Name = entertainmentName;
    let Rating = results.results[position].vote_average;
    let dateAdded = new Date().toISOString().slice(0, 10);
    let posterPath = results.results[position].poster_path;



}