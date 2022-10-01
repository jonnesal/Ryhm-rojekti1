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




const server = app.listen(8081, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Mose express listening at http://%s:%s", host, port);
})