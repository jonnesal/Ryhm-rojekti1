const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080' }));

const connection = require('./databaseInfo');
const con = mysql.createConnection({
    host: connection.credentials.host,
    user: connection.credentials.user,
    password: connection.credentials.password,
    database: connection.credentials.database
});
const query = util.promisify(con.query).bind(con);


/**
 * Hakee käyttäjän user_ID:n avulla suosikin tiedot
 */
app.get('/user/favorite', function(req, res) {
    let q = url.parse(req.url, true).query;
    let favorite = q.favorite;
    let sql = "select * from favorite" +
        "where user_ID in (" +
        "select user_ID" +
        "from user" +
        "where user_ID =  ? )";



    (async function() {
        try {
            const rows = await query(sql, [favorite]);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})


/**
 * Get all parties.
 */
app.get('/user/allfavorites', function(req, res) {
    let sql = "SELECT *" +
        " FROM favorite";

    (async function() {
        try {
            const rows = await query(sql);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

app.get(`/elokuvat`, async function (req, res) {
//Siirrän tämän koodin jossain vaiheessa omaan Js fileen

    //let movie = "Home alone";

    //Tämä antaa listan:
    //Voit kirjoittaa tähän minkä genren perustuulla haluat etsiä 10 suosituinta leffaa
    let whatGenre = "Action";
    let Movielist = [];
    //Kaikki mahdolliset genret ja niiden id

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


    const search = genres.find((name) => name.name=== whatGenre);

    console.log(search.id);

    //Kutsuu functiota
    await haeSarja();

    async function haeSarja() {

        const fetch = (...args) =>
            import('node-fetch').then(({default: fetch}) => fetch(...args));


        /////////////////////////////////////////////////////////////////////////
        //API
        const url =
            //`https://api.themoviedb.org/3/search/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&language=en-US&query=${movie}&page=1&include_adult=true`;
            //Parhaat drama elokuvat

            `https://api.themoviedb.org/3/discover/movie?api_key=ffbef3b4a61b4f7178a8fe83e0ad8b9d&with_genres=${search.id}&sort_by=vote_average.desc&vote_count.gte=10`;

        const options = {
            method: 'GET',
            headers: {
                //Tätä ei tarvii mutta paska hajoo jos tän poistaa, muokkaan joskus
                'X-RapidAPI-Host': 'ffbef3b4a61b4f7178a8fe83e0ad8b9d',
                'X-RapidAPI-Key': 'your-rapidapi-key'
            }
        };

        fetch(url, options)
            .then(res => res.json())
            .catch(err => console.error('error:' + err));
        try {
            let response = await fetch(url, options);

            response = await response.json();

            //Kovakoodasin max limit ja muuttaa json filen listaksi
            for(let i = 0; i<9; i++) {
                Movielist.push(response["results"][i]);
            }
            console.log(Movielist);

            return Movielist;



        } catch (err) {
            console.log(err);

        }
    }






});


const server = app.listen(8081, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Mose express listening at http://%s:%s", host, port);
})