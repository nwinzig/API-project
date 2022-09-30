const express = require('express');
const {sequelize, Op} = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models')
const { ReviewImage } = require('../../db/models')

////// get all the current users bookings //////

router.get('/current', requireAuth, async (req,res,next) => {

    const userId = req.user.id;

    let currentBookings = await Booking.findAll({
        where: {
            userId: userId
        },
        include: [
            {
                model: Spot,
                include: {
                    model: Review,
                    include: {
                        model: ReviewImage
                    }
                }

            },
        ]

    })


    // currentBookings.forEach(booking => {
    //     let desiredSpot = booking.Spot
    //     console.log("this is the spot object",desiredSpot.toJSON())


    //     // let desiredReviewImage = desiredReview.ReviewImages
    //     desiredSpot = desiredSpot.toJSON()
    //     console.log("this should be just review", desiredSpot.Reviews)
    //     desiredSpot.previewImage = desiredSpot.Reviews.ReviewImages[0].dataValues.url
    //     console.log("this should be reviewImages", desiredSpot.Reviews.ReviewImages)
    //     booking.Spot.dataValues.previewImage = desiredSpot.ReviewImages[0].dataValues.url

    //     delete booking.Spot.Reviews.ReviewImages
    //     delete booking.Spot.Reviews
    // })


    res.status(200)
    res.json({"Bookings":currentBookings})
})


module.exports = router;
