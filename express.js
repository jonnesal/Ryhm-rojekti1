const express = require("express");
const mysql = require("mysql");
const util = require("util");
const url = require("url");
const path = require("path");
const bodyParser = require("body-parser");
const cors = require("cors");
const app = express();

let loggedIn = false;
let currentUser;

app.use(
  cors({
    origin: "*",
  })
);

const PORT = 8080;

app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());


const connection = require('./Js/databaseConnection');

const query = util.promisify(connection.query).bind(connection);

const loginRoute = require("./routes/loginRouter");
const searchRouter = require("./routes/search");
const registerRouter = require("./routes/registerRouter");

app.use("/", loginRoute);
app.use("/", searchRouter);
app.use("/", registerRouter);

// styles for main
app.use(express.static(path.join(__dirname + "css")));

app.get("/", (req, res) => {
  res.sendFile(`${process.cwd()}/main.html`);
});

app.get("/roulette.html", (req, res) => {
  res.sendFile(`${process.cwd()}/roulette.html`);
});

app.get("/login.html", (req, res) => {
  res.sendFile(`${process.cwd()}/html/login.html`);
});

app.get("/register.html", (req, res) => {
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

// Get all from users
app.get("/api/register", (req, res) => {
  let sql = "SELECT * FROM users";

  (async function () {
    try {
      const rows = await query(sql);
      res.send(rows);
    } catch (err) {
      console.log("Database error. " + err);
    }
  })();
});

// Insert a new user to the database
app.post("/api/register", function (req, res) {
  let sql;
  let response = false;
  if (req.body.test == true) {
    sql =
      "INSERT INTO users (user_id, first_name, last_name, user_name, user_pass)" +
      " VALUES (1, ?, ?, ?, ?)";
  } else {
    sql =
      "INSERT INTO users (first_name, last_name, user_name, user_pass)" +
      " VALUES (?, ?, ?, ?)";
  }

  (async function () {
    try {
      let result = await query(sql, [
        req.body.fname,
        req.body.lname,
        req.body.username,
        req.body.password,
      ]);
      if (result.affectedRows != 0) {
        response = true;
      }
    } catch (err) {
      console.log("Database error. " + err);
    }
    res.send(response);
  })();
});
//remove user from the database
app.delete("/api/register", function (req, res) {
  let response = false;
  let sql = "DELETE FROM users" + " WHERE user_name = ?";

  (async function () {
    try {
      let result = await query(sql, [req.body.name]);
      if (result.affectedRows != 0) {
        response = true;
      }
    } catch (err) {
      console.log("Database error. " + err);
    }
    res.send(response);
  })();
});

// Get all from specific user based on user_name and user_password
app.post("/api/login", function (req, res) {
  let response = "false";
  let sql = "SELECT * FROM users WHERE user_name = ? AND user_pass = ?";

  let username = req.body.username;
  let password = req.body.password;

  query(sql, [req.body.username, req.body.password], function (err, results) {
    if (results.length > 0) {
      loggedIn = true;
      console.log("expressjs loggedIn: " + loggedIn);

      checkCurrentUser(username, password);

      response = "true";
    } else {
      loggedIn = false;
      console.log("expressjs loggedIn: " + loggedIn);
    }
    res.send(response);
  });
});

// Check the user_id from the current user and paste it to currentUser
function checkCurrentUser(username, password) {
  let sql = "SELECT user_id FROM users WHERE user_name = ? AND user_pass = ?";

  query(sql, [username, password], function (err, results) {
    currentUser = results[0].user_id;
    console.log("Current user ID: " + currentUser);
  });
}

/**
 * returns true if user has loggedIn
 */
app.get("/api/loggedIn", function (req, res) {
  res.send(loggedIn);
});

/**
 * Set variable currentUser = null
 * and loggedIn = false
 */
app.post("/api/logOut", function (req, res) {
  currentUser = null;
  loggedIn = false;
  console.log("expressjs loggedIn: " + loggedIn);
  console.log("currentUser: " + currentUser);
});


// Get all from favorites
searchRouter.get("/api/favorites", function (req, res) {
  let sql = "SELECT * FROM favorite";

  (async function () {
    try {
      const rows = await query(sql);
      res.send(rows);
    } catch (err) {
      console.log("Database error. " + err);
    }
  })();
});

// Insert a movie/series in the favorites for the current user
searchRouter.post("/api/favorites", function (req, res) {
  let response = false;
  let sql =
    "INSERT INTO favorite (name, rating, date, imageURL, user_id)" +
    " VALUES (?, ?, ?, ?, ?)";

  (async function () {
    try {
      if (loggedIn) {
        console.log("loggedIn on true");

        let result = await query(sql, [
          req.body.name,
          req.body.rating,
          req.body.dateAdded,
          req.body.posterPath,
          currentUser,
        ]);
        if (result.affectedRows != 0) {
          response = true;
        }
      } else {
        console.log("loggedIn on false");
      }
    } catch (err) {
      console.log("Database error. " + err);
    }
    res.send(response);
  })();
});

//  Get all favorites from current user
searchRouter.get("/api/getFavoritesFromCurrentUser", function (req, res) {
  let sql = "SELECT * FROM favorite WHERE user_id = " + currentUser;

  (async function () {
    try {
      const rows = await query(sql);
      console.log("favorite rows length: " + rows.length);
      res.send(rows);
    } catch (err) {
      console.log("Database error. " + err);
    }
  })();
});

// Count how many movies/series current user has in favorites
searchRouter.get("/api/CountFavorites", function (req, res) {
  let sql = "SELECT * FROM favorite WHERE user_id = " + currentUser;

  (async function () {
    try {
      const rows = await query(sql);
      const rowCount = rows.length;
      console.log("row Count: " + rowCount);
      res.send({ rowCount: rowCount });
    } catch (err) {
      console.log("Database error. " + err);
    }
  })();
});

// delete movie/series from favorites based on the user_id and movie name
app.delete("/api/favorites", function (req, res) {
  let response = false;
  let sql = "DELETE FROM favorite" + " WHERE user_id = ? AND name = ?";

  (async function () {
    try {
      let result = await query(sql, [currentUser, req.body.name]);
      if (result.affectedRows != 0) {
        response = true;
      }
    } catch (err) {
      console.log("Database error. " + err);
    }
    res.send(response);
  })();
});

// server port: 8080
const server = app.listen(PORT, function () {
  const host = server.address().address;
  const port = server.address().port;

  console.log("Mose express listening at http://localhost:%s", port);
});
