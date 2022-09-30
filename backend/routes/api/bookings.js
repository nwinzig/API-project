const express = require('express');
const {sequelize, Op} = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models')
const { ReviewImage } = require('../../db/models');
const e = require('express');

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
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: [{
                    model: SpotImage
                }]

            },
        ]

    })
    let allBookings = [];

    currentBookings.forEach(booking =>{
        allBookings.push(booking.toJSON())

    })

    allBookings.forEach(booking => {
        let desiredSpot = booking.Spot

        desiredSpot.previewImage = desiredSpot.SpotImages[0].url

        delete booking.Spot.SpotImages
        // console.log(delete booking.Spot.SpotImages)
    })


    res.status(200)
    res.json({"Bookings":allBookings})
    // res.json({'Bookings': currentBookings})
})


module.exports = router;
