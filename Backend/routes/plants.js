const express = require('express');
const router = express.Router();
const db = require("../database/database");
const limit = 20;

router.get("/", (req, res) => {
    const sql = "SELECT * FROM `registered_plants` LIMIT " + limit;
    db.all(sql, (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.post("/", (req, res) => {
    const sql = "INSERT INTO `registered_plants` (name) VALUES (?);"

    if (!req.body || !req.body.name) {
        res.status(400).send("No name provided")
        return;
    }

    if (req.body.name.length < 3) {
        res.status(400).send("Name needs to be longer than 3 characters")
        return;
    }

    if (req.body.name.length > 20) {
        res.status(400).send("Name needs to be shorter than than 20 characters")
        return;
    }

    db.run(sql, [req.body.name], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});

router.put("/:id", (req, res) => {
    const sql = "UPDATE `registered_plants` SET name = ? WHERE id = ?" + limit;

    if (!req.body || !req.body.name) {
        res.status(400).send("No name provided");
        return;
    }

    try {
        const id = parseInt(req.params.id);
        const idFloat = parseFloat(req.params.id);
        if (id < 1) throw new Error("Number needs to be positive integer");
        if (id != idFloat) throw new Error("Number needs to be integer");
    } catch (error) {
        res.status(400).send("Invalid id provided");
        return;
    }

    if (req.body.name.length < 3) {
        res.status(400).send("Name needs to be longer than 3 characters");
        return;
    }

    if (req.body.name.length > 20) {
        res.status(400).send("Name needs to be shorter than than 20 characters");
        return;
    }

    db.run(sql, [req.body.name, req.params.id], (err, result) => {
        if(err) throw err;
        res.send(result);
    });
});