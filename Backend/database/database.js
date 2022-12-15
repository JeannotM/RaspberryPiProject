// require('dotenv').config();
const sqlite3 = require('sqlite3').verbose();
// const mysql = require("mysql");

// const db = mysql.createConnection({
//     host     : "localhost",
//     user     : "root",
//     password : "",
//     database : "stats",
//     multipleStatements: true
// });
// db.connect(err => {
//     if(err) throw err;
//     console.log("MySQL Connected...");
// });

module.exports = new sqlite3.Database('database/plants.db', mode=sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if(err) throw err;
    console.log("SQLite Connected...");
});