const express = require('express');
const cookieParser = require("cookie-parser");
const sessions = require('express-session');
const http = require('http');
let parseUrl = require("body-parser");
const registerRouter = express.Router();
const app = express();

let mysql = require('mysql');

let encoderUrl = parseUrl.urlencoded({
	extended: false
});

//app.use(parseUrl.urlencoded({ extended: false }));

// connection kyselyjen tekemiseen
const connection = require('../js/databaseConnection');
const {
	query
} = require('express');


//session middleware
app.use(sessions({
	secret: "thisismysecrctekey",
	saveUninitialized: true,
	cookie: {
		maxAge: 1000 * 60 * 60 * 24
	}, // 24 hours
	resave: false
}));

app.use(cookieParser());





/*registerRouter.post('/register', encoderUrl, (req, res) => {

	//checking if user already registered or no
	connection.query(`SELECT * FROM users WHERE user_name = '${req.body.userName}' AND user_pass = '${req.body.password}'`, function (err, result) {
		if (err) {
			console.log(err);
		};
		if (Object.keys(result).length > 0) {
			res.sendFile(`${process.cwd()}/html/failReg.html`)
		} else {
			//creating user
			let response = false;
			let sql = "INSERT INTO users (first_name, last_name, user_name, user_pass)" +
				" VALUES (?, ?, ?, ?)";

			(async function () {
				try {
					let result = await connection.query(sql, [req.body.firstName, req.body.lastName, req.body.userName, req.body.password])
					if (result.affectedRows != 0) {
						response = true;
					}
				} catch (err) {
					console.log("Database error. " + err);
				}
				res.redirect('/roulette');
			})()
		}
	})

})
*/


// when register is success
registerRouter.get("/roulette", function (req, res) {
	res.sendFile(`${process.cwd()}/roulette.html`);
})

module.exports = registerRouter;