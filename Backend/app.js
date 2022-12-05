// require('dotenv').config();
const express = require('express');
const path = require("path");
const mysql = require("mysql")

// ================================================ CREATION ===========
const app = express();
const db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "root",
    database : "stats"
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected...");
})

// https://www.youtube.com/watch?v=EN6Dx22cPRI
app.get("/createdb", (req, res) => {
    let sql = "CREATE DATABASE IF NOT EXISTS stats;" + 
    "use stats;"
    "CREATE TABLE IF NOT EXISTS `water_level` (id INT AUTO_INCREMENT, level INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));" +
    "CREATE TABLE IF NOT EXISTS `ground_humidity` (id INT AUTO_INCREMENT, level INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));" +
    "CREATE TABLE IF NOT EXISTS `water_pumped` (id INT AUTO_INCREMENT, level INT NOT NULL, created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY(id));";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...");
    });
});

// ================================================ SERVE FRONTEND =====
// app.use(express.static('../public'));

// ================================================ MIDDLEWARE =========
app.use(express.json()); // adds the json body to the request object

// ================================================ ROUTES =============
app.use('/api/stats', require('./routes/stats'));

// ================================================ IMPORTS =============

// ================================================ START ==============
const server = app.listen(3000, () => {
    let name = "stats";
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
});