// require('dotenv').config();
const express = require('express');
const path = require("path");
const mysql = require("mysql");
const cors = require("cors");
const limit = 20;

// ================================================ CREATION ===========
const app = express();
const db = mysql.createConnection({
    host     : "localhost",
    user     : "root",
    password : "",
    database : "stats",
    multipleStatements: true
});

db.connect(err => {
    if(err) throw err;
    console.log("MySQL Connected...");
});

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', ['*']);
    res.append('Access-Control-Allow-Methods', 'GET');
    res.append('Access-Control-Allow-Headers', 'Content-Type');
    next();
});

// ================================================ SERVE FRONTEND =====
// app.use(express.static('../public'));

// ================================================ MIDDLEWARE =========
app.use(express.json()); // adds the json body to the request object
const corsOptions = {
    origin: '*',
    methods: 'GET',
    credentials: false,
    allowedHeaders: 'GET',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.options('*', cors(corsOptions));

// ================================================ ROUTES =============
// https://www.youtube.com/watch?v=EN6Dx22cPRI
app.get("/createdb", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8100');
    let sql = "CREATE TABLE IF NOT EXISTS `water_level` (id INT AUTO_INCREMENT, level INT NOT NULL, PRIMARY KEY(id)); " +
    "CREATE TABLE IF NOT EXISTS `ground_humidity` (id INT AUTO_INCREMENT, level INT NOT NULL, PRIMARY KEY(id)); " +
    "CREATE TABLE IF NOT EXISTS `water_pumped` (id INT AUTO_INCREMENT, level INT NOT NULL, PRIMARY KEY(id)); ";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Database created...");
    });
});

app.get("/populatedb", (req, res) => {
    let sql = "INSERT INTO `water_level` (level) VALUES (800), (798), (600), (599), (598);" + 
    "INSERT INTO `ground_humidity` (level) VALUES (200), (199), (300), (305), (304);" +
    "INSERT INTO `water_pumped` (level) VALUES (0), (0), (1), (0), (0);";
    db.query(sql, (err, result) => {
        if(err) throw err;
        console.log(result);
        res.send("Tables populated...");
    });
});

app.get("/api/stats/waterlevel", (req, res) => {
    const sql = "SELECT * FROM `water_level` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get("/api/stats/groundhumidity", (req, res) => {
    const sql = "SELECT * FROM `ground_humidity` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get("/api/stats/waterpumped", (req, res) => {
    res.set('Access-Control-Allow-Origin', 'http://localhost:8100');
    const sql = "SELECT * FROM `water_pumped` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// ================================================ IMPORTS =============

// ================================================ START ==============
const server = app.listen(3000, () => {
    let name = "stats";
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
});