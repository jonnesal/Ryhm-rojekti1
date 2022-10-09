const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();

const PORT = 8080;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors({ origin: 'http://localhost:8080' }));

const connection = require('./js/databaseconnection');


const query = util.promisify(connection.query).bind(connection);


const loginRoute = require('./routes/login');
const searchRouter = require('./routes/search');

app.use('/', loginRoute);
app.use('/', searchRouter);

app.get("/", (req, res) => {
    res.send({ data: "Here is your data" });
});


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