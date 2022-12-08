// require('dotenv').config();
const express = require('express');
// const path = require("path");
// const mysql = require("mysql");
const cors = require("cors");
const sqlite3 = require('sqlite3').verbose();

const limit = 20;

// ================================================ CREATION ===========
const app = express();
// const db = mysql.createConnection({
//     host     : "localhost",
//     user     : "root",
//     password : "",
//     database : "stats",
//     multipleStatements: true
// });

const db = new sqlite3.Database('database.db', mode=sqlite3.OPEN_CREATE | sqlite3.OPEN_READWRITE, (err) => {
    if(err) throw err;
    console.log("SQLite Connected...");
});

// db.connect(err => {
//     if(err) throw err;
//     console.log("MySQL Connected...");
// });

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
    methods: 'GET,POST',
    credentials: false,
    allowedHeaders: 'GET,POST',
    optionsSuccessStatus: 200 // For legacy browser support
};

app.options('*', cors(corsOptions));

// ================================================ ROUTES =============
// https://www.youtube.com/watch?v=EN6Dx22cPRI
app.get("/createdb", (req, res) => {
    db.run("CREATE TABLE IF NOT EXISTS `water_level` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL);");
    db.run("CREATE TABLE IF NOT EXISTS `ground_humidity` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL);");
    db.run("CREATE TABLE IF NOT EXISTS `water_pumped` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL);");
    res.send("Database created...");
});

app.get("/populatedb", (req, res) => {
    db.run("INSERT INTO `water_level` (level) VALUES (800), (798), (600), (599), (598);");
    db.run("INSERT INTO `ground_humidity` (level) VALUES (200), (199), (300), (305), (304);");
    db.run("INSERT INTO `water_pumped` (level) VALUES (0), (0), (1), (0), (0);");
    res.send("Database populated...");
})

app.get("/api/stats/waterlevel", (req, res) => {
    const sql = "SELECT * FROM `water_level` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get("/api/stats/groundhumidity", (req, res) => {
    const sql = "SELECT * FROM `ground_humidity` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.get("/api/stats/waterpumped", (req, res) => {
    const sql = "SELECT * FROM `water_pumped` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// ======= POST REQUESTS =======
app.post("/api/stats/waterlevel", (req, res) => {
    if (!req.body || !req.body.level) {
        res.status(401).send("No values provided");
        return;
    }

    const sql = "INSERT INTO `water_level` (level) VALUES (?);";
    db.run(sql, [req.body.level], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.post("/api/stats/groundhumidity", (req, res) => {
    if (!req.body || !req.body.level) {
        res.status(401).send("No values provided");
        return;
    }

    const sql = "INSERT INTO `ground_humidity` (level) VALUES (?);";
    db.run(sql, [req.body.level], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

app.post("/api/stats/waterpumped", (req, res) => {
    if (!req.body || !req.body.level) {
        res.status(401).send("No values provided");
        return;
    }

    const sql = "INSERT INTO `water_pumped` (level) VALUES (?);";
    db.run(sql, [req.body.level], (err, result) => {
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