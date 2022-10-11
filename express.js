const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


app.use(cors({ origin: '*' }));

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const connection = require('./js/databaseconnection');

const query = util.promisify(connection.query).bind(connection);

const loginRoute = require('./routes/loginRouter');
const searchRouter = require('./routes/search');
const registerRouter = require('./routes/registerRouter');

app.use('/', loginRoute);
app.use('/', searchRouter);
app.use('/', registerRouter);


// styles for main
app.use(express.static(path.join(__dirname+ "css")));


app.get("/", (req, res) => {
    res.sendFile(`${process.cwd()}/main.html`);
});

app.get('/roulette.html', (req, res) => {
    res.sendFile(`${process.cwd()}/roulette.html`);
});

app.get('/login.html', (req, res) => {
    res.sendFile(`${process.cwd()}/html/login.html`);
});

app.get('/register.html', (req, res) => {
    res.sendFile(`${process.cwd()}/html/register.html`);
});



app.get("/Js/random.js", (req, res) => {
    res.sendFile(`${process.cwd()}/js/random.js`);
});

app.get("/Js/printResults.js", (req, res) => {
    res.sendFile(`${process.cwd()}/js/printResults.js`);
});

app.get("/Js/favorite.js", (req, res) => {
    res.sendFile(`${process.cwd()}/js/favorite.js`);
});

app.get("/style", (req, res) => {
    res.sendFile(`${process.cwd()}/style.css`);
});




app.get('/api/register', (req, res) => {
	let sql = "SELECT * FROM users";

    (async function() {
        try {
            const rows = await query(sql);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
});


app.post('/api/register', function(req, res) {
    let response = false;
    let sql = "INSERT INTO users (first_name, last_name, user_name, user_pass)" +
				" VALUES (?, ?, ?, ?)";
    (async function() {
        try {
            let result = await query(sql, [req.body.fname, req.body.lname, req.body.username, req.body.password]);
            if (result.affectedRows != 0) {
                response = true;
            }
        } catch (err) {
            console.log("Database error. " + err);
        }
        res.send(response);
    })()
})


app.post('/api/login', function(req,res) {
    let response = false;
    let sql = "SELECT * FROM users WHERE user_name = ? AND user_pass = ?";
    (async function() {
        try {
            const result = await query(sql, [req.body.username, req.body.password]);
            if (result.affectedRows != 0) {
                response = true;
            }
        } catch (err) {
            console.log("Database error. " + err);
        }
        console.log("testiiiiiiiiiiiiiii"+req.body.username);
        res.send(response);
    })()
})







searchRouter.get('/api/favorites', function(req, res) {
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

searchRouter.post('/api/favorites', function(req, res) {
    let response = false;
    let sql = "INSERT INTO favorite (name, rating, date, imageURL, user_id)" +
        " VALUES (?, ?, ?, ?, ?)";

    (async function() {
        try {
            let result = await query(sql, [req.body.name, req.body.rating, req.body.dateAdded,
                req.body.posterPath, req.body.userId
            ]);
            if (result.affectedRows != 0) {
                response = true;
            }
        } catch (err) {
            console.log("Database error. " + err);
        }
        res.send(response);
    })()
})


const server = app.listen(PORT, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Mose express listening at http://localhost:%s", port);
})