const express = require('express');
const bodyParser = require("body-parser");
const rouletteRouter = express.Router();
const encoder = bodyParser.urlencoded();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// connection kyselyjen tekemiseen
const connection = require('../js/databaseConnection');











module.exports = rouletteRouter;