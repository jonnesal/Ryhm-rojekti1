const position = localStorage.getItem("Position");
const results = JSON.parse(localStorage.getItem("Results"));


function putToFavorite(entertainmentName, rate, poster) {


    let Name = entertainmentName;
    let Rating = rate
    console.log(Rating);
    let dateAdded = new Date().toISOString().slice(0, 10);
    let posterPath = poster

    const data = {
        "name": Name,
        "rating": Rating,
        "dateAdded": dateAdded,
        "posterPath": posterPath,
        "userId": 1
    }

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "http://localhost:8080/api/favorites");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function() {
        console.log(xhr.responseText);
    }
    console.log(data);
    let eventString = JSON.stringify(data);
    xhr.send(eventString);

}