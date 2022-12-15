const express = require('express');
const router = express.Router();
const db = require("../database/database");
const limit = 20;

router.get("/waterlevel", (req, res) => {
    const sql = "SELECT * FROM `water_level` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.get("/groundhumidity/:id", (req, res) => {
    const sql = "SELECT * FROM `ground_humidity` WHERE registered_plant_id = ? LIMIT " + limit;

    try {
        const id = parseInt(req.params.id);
        const idFloat = parseFloat(req.params.id);
        if (id < 1) throw new Error("Number needs to be positive integer");
        if (id != idFloat) throw new Error("Number needs to be integer");
    } catch (error) {
        res.status(400).send("Invalid id provided");
        return;
    }

    db.all(sql, [req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.get("/waterpumped", (req, res) => {
    const sql = "SELECT * FROM `water_pumped` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

// ================================================ POST REQUESTS =============
router.post("/waterlevel", (req, res) => {
    if (!req.body || !req.body.level) {
        res.status(400).send("No values provided");
        return;
    }

    const sql = "INSERT INTO `water_level` (level) VALUES (?);";
    db.run(sql, [req.body.level], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.post("/groundhumidity", (req, res) => {
    if (!req.body || !req.body.level || !req.body.plant) {
        res.status(400).send("No level or plant provided");
        return;
    }

    const sql = "INSERT INTO `ground_humidity` (level, registered_plant_id) VALUES (?, ?);";
    db.run(sql, [req.body.level, req.body.plant], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.post("/waterpumped", (req, res) => {
    if (!req.body || !req.body.level) {
        res.status(400).send("No values provided");
        return;
    }

    const sql = "INSERT INTO `water_pumped` (level) VALUES (?);";
    db.run(sql, [req.body.level], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

module.exports = router;
