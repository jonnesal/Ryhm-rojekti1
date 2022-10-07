const mysql = require('mysql');

const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "joku124",
    database: "mosedb"
});

connection.connect(function(err) {
    if (err) throw err;
    else console.log("connected to the database successfully!")
});

module.exports = connection;