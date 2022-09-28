const express = require('express');
const sequelize = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
const spot = require('../../db/models/spot');
const router = express.Router();


//get all spots

router.get('/', async (req,res) => {

    const spots = await Spot.findAll(
        {
            // attributes: {
            //     include: [
            //         [sequelize.fn('AVG',sequelize.col('Reviews.stars')), 'avgRating']
            //     ]
            // },
            include: [
                {
                    model: Review,

                },
                {
                    model: SpotImage,
                }
            ]
        }
    )
    //finding preview image url
    let allSpots = [];

    spots.forEach(spot => {
        allSpots.push(spot.toJSON())
    });

    allSpots.forEach(spot => {
        spot.SpotImages.forEach(image => {

            if(image.preview === true){
            spot.previewImage = image.url
        }
            if(image.preview === false){
                spot.previewImage = "No image url"
            }
        })
        delete spot.SpotImages;
    })

    //finding average rating
    allSpots.forEach(spot => {
        // let spotAvgReview = Spot.findByPk(spot.id, {
        //     attributes: {
        //         include: [
        //             [sequelize.fn('AVG', sequelize.col('Reviews.stars')), 'avgRating']
        //         ]
        //     },
        //     include: [
        //         {
        //             model: Review,
        //             attributes: []
        //         },
        //     ]
        // })
        // console.log(spotAvgReview.avgRating)

        // if(spotAvgReview){
        //     spot.avgRating = spotAvgReview
        // }
        // if(!spotAvgReview){
        //     spot.spotRating = "Not enough Reviews"
        // }


        let sum = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            if(review.stars){
            sum += review.stars;
            count++
            delete spot.Reviews;
        }
        })
        console.log(sum)
        console.log(count)

        const avg = sum/count;

        console.log(avg)

        if(!isNaN(avg)){
            spot.avgRating = avg
        }
    })

    //return

    res.json(allSpots)
    // res.json({"Spots": spots})
} )











module.exports = router;
