const express = require('express');
const mysql = require('mysql');
const util = require('util');
const url = require('url');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');
const app = express();


let loggedIn = false;
let currentUser;

app.use(cors({
    origin: '*'
}));

const PORT = 8080;

app.use(bodyParser.urlencoded({
    extended: false
}));
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
app.use(express.static(path.join(__dirname + "css")));


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

    (async function () {
        try {
            const rows = await query(sql);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
});


app.post('/api/register', function (req, res) {
    let response = false;
    let sql = "INSERT INTO users (first_name, last_name, user_name, user_pass)" +
        " VALUES (?, ?, ?, ?)";
    (async function () {
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


app.post('/api/login', function (req, res) {
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

    

})

app.get('/api/getCurrentUser', function (req, res) {

    let sql = "SELECT user_id FROM users WHERE user_name = ? AND user_pass = ?";

    query(sql, [req.body.username, req.body.password], function (err, results) {

    })
    console.log("currentUser: " + currentUser);
});


function checkCurrentUser(username, password) {

    let sql = "SELECT user_id FROM users WHERE user_name = ? AND user_pass = ?";

    query(sql, [username, password], function (err, results) {
        currentUser = results[0].user_id;
        console.log(typeof currentUser);

        console.log(currentUser);
        
    })
    
}



searchRouter.get('/api/favorites', function (req, res) {
    let sql = "SELECT * FROM favorite";

    (async function () {
        try {
            const rows = await query(sql);
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

searchRouter.post('/api/favorites', function (req, res) {
    let response = false;
    let sql = "INSERT INTO favorite (name, rating, date, imageURL, user_id)" +
        " VALUES (?, ?, ?, ?, ?)";

    (async function () {
        try {
            if (loggedIn) {
                console.log("loggedIn on true");

                let result = await query(sql, [req.body.name, req.body.rating, req.body.dateAdded,
                    req.body.posterPath, currentUser
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
    })()
})

// ?????????????????????????????????????
searchRouter.get('/api/getFavorites', function (req, res) {
    let sql = "SELECT * FROM favorite WHERE user_id = " + currentUser;

    (async function () {
        try {
            const rows = await query(sql);
            connection.query(sql);
            console.log(rows);
            console.log(typeof (rows));
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})



searchRouter.get('/api/getFavorites2', function (req, res) {
    let sql = "SELECT * FROM favorite WHERE user_id = ?";

    (async function () {
        try {
            console.log("---------------- getFav userID: " + currentUser);
            const rows = await query(sql, [currentUser]);
            connection.query(sql);
            console.log(rows);
            console.log(typeof (rows));
            res.send(rows);
        } catch (err) {
            console.log("Database error. " + err);
        }
    })()
})

function executeQuery(sql, cb) {

    connection.query(sql, function (error, result, fields) {
        if (error) {
            throw error;
        }
        cb(result);
    })
}



function fetchData(response) {

    executeQuery("SELECT * FROM favorite", function (result) {
        console.log(result);
        response.write('<table><tr>');

        for (let column in result[0]) {
            response.write('<td><label>' + column + '</label></td>');
            response.write('</tr>');
        }
        for (let row in result) {
            response.write('<tr>');
            for (let column in result[row]) {
                response.write('<td><label>' + result[row][column] + '</label></td>');
            }
            response.write('</tr>');
        }
        response.end('</table>');
    });

}

// ------------------------------------------------------------------







const server = app.listen(PORT, function () {
    const host = server.address().address;
    const port = server.address().port;

    console.log("Mose express listening at http://localhost:%s", port);
})