const express = require('express');

const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')

const router = express.Router();


//get all spots

router.get('/', async (req,res) => {
    let spots;
    //gets all
    // spots = await Spot.findAll()

    spots = await Spot.findAll(
        {
            include: [
                {
                    model: SpotImage,
                    attributes: ['url'],

                }
            ]
        }
    )




    res.json({"Spots": spots})
} )











module.exports = router;
