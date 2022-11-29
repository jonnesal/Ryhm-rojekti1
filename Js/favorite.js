const position = localStorage.getItem("Position");
const results = JSON.parse(localStorage.getItem("Results"));

const favButton = document.querySelector("#favorites_search");





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
    xhr.onload = function () {
        console.log(xhr.responseText);
    }
    console.log(data);
    let eventString = JSON.stringify(data);
    xhr.send(eventString);

}

let testi;

function getFavorites() {

    let xhr = new XMLHttpRequest();
    xhr.open("GET", "http://localhost:8080/api/getFavorites");
    xhr.setRequestHeader("Accept", "application/json");
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onload = function () {
        if (xhr.readyState === xhr.DONE) {
            if (xhr.status === 200) {

                let testi = xhr.response;
                let testi2 = JSON.stringify(testi);
                let testi3 = this.responseText;
                console.log("------ testi----------" + testi);
                console.log("------ testi2----------" + testi2);
                console.log("------ testi3----------" + testi3);
                console.log("------ response----------" + xhr.responseText);

                printResults2(testi);
                
               

            }
        }
    }

    xhr.send();
}







favButton.addEventListener("click", () => {
    console.log("nappi ");
    getFavorites();
});











// -------------- Print favorites to page --------------------------

const favResultsDiv = document.querySelector("#favResults");

let searchAmount2 = 1;
let entertainmentName2;

const printResults2 = (results) => {

    let moro = JSON.parse(results);

    favResultsDiv.innerHTML = ``;

    for (let i = 0; i < searchAmount2; i++) {

        const entertainment = document.createElement("a");
        entertainment.href = "../html/searchDetails.html";
        entertainment.className = "entertainment";


        const title = document.createElement("p");
        title.setAttribute("id", "title");

        // toimii
       // title.innerText = results;

        title.innerText = moro[i].name;
        

        //title.innerText = results.results[i].name;

        // results.results[i].original_title

        // title.innerText = results.results[i];

        favResultsDiv.appendChild(title);
        favResultsDiv.appendChild(entertainment);

        

    }

}