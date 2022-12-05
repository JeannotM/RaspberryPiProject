const express = require('express');
const router = express.Router();
const db = express().get.db;
const limit = 20;

router.get("/", (req, res) => {
    res.json({"test": true});
});

router.get("/waterlevel", (req, res) => {
    const sql = "SELECT * FROM `water_level` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.get("/groundhumidity", (req, res) => {
    const sql = "SELECT * FROM `ground_humidity` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.get("/waterpump", (req, res) => {
    const sql = "SELECT * FROM `water_pumped` LIMIT " + limit;
    db.query(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

module.exports = router;