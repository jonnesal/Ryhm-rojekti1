const mysql = require("mysql");

/**
 * Connection to database
 * @param {String} host IP where to connect
 * @param {String} user Database account username
 * @param {String} password Database account password
 * @param {String} database Database name
 */
const connection = mysql.createConnection({
  host: "10.114.34.75",
  user: "remote",
  password: "joku124",
  database: "moseDB",
});

connection.connect(function (err) {
  if (err) throw err;
  else console.log("connected to the database successfully!");
});

module.exports = connection;
