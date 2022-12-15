const db = require("./database/database");
const express = require('express');
const cors = require("cors");

// ================================================ CREATION ===========
const app = express();
app.use(express.json({ extended: false })); // adds the json body to the request object

app.use((req, res, next) => {
    res.append('Access-Control-Allow-Origin', '*');
    res.append('Access-Control-Allow-Methods', 'GET,POST,PUT,PATCH,DELETE,OPTIONS');
    res.append('Access-Control-Allow-Headers', 'Content-Type,Authorization');
    next();
});

// ================================================ SERVE FRONTEND =====
// app.use(express.static('../public'));

// ================================================ MIDDLEWARE =========
// app.options('*', cors({
//     origin: '*',
//     methods: 'GET,POST,PUT,DELETE,OPTIONS',
//     credentials: false,
//     allowedHeaders: 'Content-Type,Authorization',
//     optionsSuccessStatus: 200 // For legacy browser support
// }));

// ================================================ ROUTES =============
app.use('/api/stats', require('./routes/stats'));
app.use('/api/plants', require('./routes/plants'));

// https://www.youtube.com/watch?v=EN6Dx22cPRI
app.get("/createdb", (req, res) => {
    db.run("CREATE TABLE IF NOT EXISTS `water_level` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL, created_at DEFAULT CURRENT_TIMESTAMP);");
    db.run("CREATE TABLE IF NOT EXISTS `ground_humidity` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL, registered_plant_id INT NOT NULL, created_at DEFAULT CURRENT_TIMESTAMP);");
    db.run("CREATE TABLE IF NOT EXISTS `water_pumped` (id INTEGER PRIMARY KEY AUTOINCREMENT, level INTEGER NOT NULL, created_at DEFAULT CURRENT_TIMESTAMP);");
    db.run("CREATE TABLE IF NOT EXISTS `registered_plant` (id INTEGER PRIMARY KEY AUTOINCREMENT, name VARCHAR(20) NOT NULL DEFAULT 'plant', created_at DEFAULT CURRENT_TIMESTAMP);");
    res.send("Database created...");
});

app.get("/populatedb", (req, res) => {
    db.run("INSERT INTO `registered_plant` (name) VALUES ('Hendrik');");
    db.run("INSERT INTO `water_level` (level) VALUES (800), (798), (600), (599), (598);");
    db.run("INSERT INTO `ground_humidity` (level, registered_plant_id) VALUES (200, 1), (199, 1), (300, 1), (305, 1), (304, 1);");
    db.run("INSERT INTO `water_pumped` (level) VALUES (0), (0), (1), (0), (0);");
    res.send("Database populated...");
});

// ================================================ IMPORTS =============

// ================================================ START ==============
const server = app.listen(3000, () => {
    let name = "stats";
    let port = server.address().port;
    console.log(`${name} listening on port ${port}`);
});