const express = require('express');

const { Spot } = require('../../db/models');

const router = express.Router();


//get all spots

router.get('/', async (req,res) => {
    let spots;

    spots = await Spot.findAll()

    res.json({"Spots": spots})
} )













module.exports = router;
