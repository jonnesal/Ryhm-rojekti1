const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "10.114.34.75",
    user: "remote",
    password: "joku124",
    database: "moseDB"
});

connection.connect(function(err) {
    console.log("sus");
    if (err) throw err;
    else console.log("connected to the database successfully!")
});

module.exports = connection;