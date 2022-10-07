const express = require('express');
const bodyParser = require("body-parser");
const rouletteRouter = express.Router();
const encoder = bodyParser.urlencoded();
const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// connection kyselyjen tekemiseen
const connection = require('../js/databaseConnection');
const { response } = require('express');

//Tallenetaan tiedot käyttäjän hakukriteerien perusteella
let movies;
let series;
let score;
let url;

//genret listattuna josta arvotaan yksi
const genres = [
    { id: 28, name: 'Action' },
    { id: 12, name: 'Adventure' },
    { id: 16, name: 'Animation' },
    { id: 35, name: 'Comedy' },
    { id: 80, name: 'Crime' },
    { id: 99, name: 'Documentary' },
    { id: 18, name: 'Drama' },
    { id: 10751, name: 'Family' },
    { id: 14, name: 'Fantasy' },
    { id: 36, name: 'History' },
    { id: 27, name: 'Horror' },
    { id: 10402, name: 'Music' },
    { id: 9648, name: 'Mystery' },
    { id: 10749, name: 'Romance' },
    { id: 878, name: 'Science Fiction' },
    { id: 10770, name: 'TV Movie' },
    { id: 53, name: 'Thriller' },
    { id: 10752, name: 'War' },
    { id: 37, name: 'Western' }
]

rouletteRouter.get("/roulette", function(req, res) {
    res.sendFile(`${process.cwd()}/html/rouletteTest.html`);
})



rouletteRouter.post("/query", function(req, res) {
    movies = req.body.movies;
    series = req.body.series;
    score = req.body.rating;

    //checks that user inputs something
    if (movies || series == 1 || movies && series == 1) {
        res.redirect("/results");
    } else {
        res.redirect("/roulette");
    }

})

rouletteRouter.get("/results", async function(req, res) {
    let Movielist = [];
    let url = generate();

    await giveResult();
    async function giveResult() {
        const fetch = (...args) =>
            import ('node-fetch').then(({ default: fetch }) => fetch(...args));

        fetch(url)
            .then(res => res.json())
            .catch(err => console.error('error:' + err));
        try {
            let response = await fetch(url);
            response = await response.json();


            Movielist.push(response["results"][Math.floor(Math.random() * 18) + 1]);
            console.log(Movielist[0]);

            res.send(Movielist[0]);



        } catch (err) {
            console.log(err);
        }


    }

})

function generate() {
    let type = true;
    if (movies && series == 1) {
        let choose = Math.floor(Math.random() * 2);

        if (choose == 0) {
            type = true;

        } else {
            type = false;
        }

    } else if (movies == 1) {
        type = true;
    } else {
        type = false;
    }

    return url = randomize(type);

}

function randomize(type) {
    //valitsee satunnaisen genren, genre taulukosta
    let choose = Math.floor(Math.random() * 19);
    let genreID = genres[choose].id;

    //arpoo 1-100 jonkun sivuston
    let page = Math.floor(Math.random() * 100) + 1;
    if (type = true) {
        url = `https://api.themoviedb.org/3/discover/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&with_genres=${genreID}&page=${page}&vote_average.gte=${score}`;
        return url;
    } else {
        url = `https://api.themoviedb.org/3/discover/tv?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&with_genres=${genreID}&page=${page}&vote_average.gte=${score}`;
        return url;
    }

}





module.exports = rouletteRouter;