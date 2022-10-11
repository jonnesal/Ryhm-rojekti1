const express = require('express');
const bodyParser = require("body-parser");
const router = express.Router();
const encoder = bodyParser.urlencoded();
const app = express();

app.use(bodyParser.urlencoded({ extended: false }));

// connection kyselyjen tekemiseen
const connection = require('../js/databaseConnection');


// Styles for login page
//router.use(__dirname + "./styles", express.static("/styles"));


router.get("/loginpage", function(req, res) {
    res.sendFile(`${process.cwd()}/html/login.html`);
})

router.post("/", encoder, function(req, res) {
    var username = req.body.username;
    var password = req.body.password;

    connection.query("select * from users where user_name = ? and user_pass = ?", [username, password], function(error, results, fields) {
        if (results.length > 0) {
            res.redirect("/roulette");
        } else {
            res.redirect("/loginpage");
        }
        res.end();
    })
})



// when login is success
// router.get("/roulette", function(req, res) {
//     res.sendFile(`${process.cwd()}/roulette.html`);
// })

module.exports = router;