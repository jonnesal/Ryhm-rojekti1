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
const rouletteRouter = require('./routes/rouletteRouter')

app.use('/', loginRoute);
app.use('/', searchRouter);
app.use('/', rouletteRouter);

app.get("/", (req, res) => {
    res.send({ data: "Here is your data" });
});




const server = app.listen(PORT, function() {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Mose express listening at http://localhost:%s", port);
})