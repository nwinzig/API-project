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
        // console.log(desiredSpot)
        // console.log(desiredSpot.SpotImages)
        // console.log(desiredSpot.SpotImages.length)

        if(desiredSpot.SpotImages.length>0){
        desiredSpot.previewImage = desiredSpot.SpotImages[0].url
        }
        if(desiredSpot.SpotImages.length === 0){
            desiredSpot.previewImage = "There are no images for this spot"
        }
        delete booking.Spot.SpotImages
        // console.log(delete booking.Spot.SpotImages)
    })


    res.status(200)
    res.json({"Bookings":allBookings})
    // res.json({'Bookings': currentBookings})
})



/////// edit a booking //////

router.put('/:bookingId', requireAuth, async (req,res,next) => {
    const userId = req.user.id;
    const bookingId = req.params.bookingId;
    const {startDate, endDate} = req.body

    // validation error

    if(!startDate || !endDate || endDate <= startDate){

        return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "endDate": "endDate cannot come before startDate"
            }
            })
    }

    let desiredBooking = await Booking.findByPk(bookingId)

    //if there is no booking

    if(!desiredBooking){
        return next({
            status:404,
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }

    //if booking doesnt belong to user

    if(userId !== desiredBooking.userId){
        return next({
            status:404,
            message: "This booking does not belong to you",
            statusCode: 404,
        })
    }
    //if end date is already past
    //need to split off timezone
    // let currentEndDate = desiredBooking.endDate
    // console.log(currentEndDate.valueOf())
    // console.log(endDate.valueOf())
    // console.log(endDate.toString())
    // console.log(endDate.toISOString())
    // console.log(currentEndDate.toISOString())
    let incomingDate = new Date(endDate)
    let currentEndDate = new Date(desiredBooking.endDate)
    // console.log(incomingDate, currentEndDate)
    // currentEndDate = currentEndDate.toString()
    // let dateString = currentEndDate.split('T')[0]
    // console.log("this is what i want to compare   ", dateString)
    if(incomingDate > currentEndDate){
        return next({
            status:403,
            message: "Past bookings can't be modified",
            statusCode: 403,
        })
    }

    /// checking desired booking vs current bookings

    const currentBookings = await Booking.findAll({
        where: {
            spotId: desiredBooking.spotId
        },
        where: {
            [Op.or]: [
                {
                    startDate: {
                        [Op.lte]: startDate
                    },
                    endDate: {
                        [Op.gte]: endDate
                    }
                },
                {
                    [Op.or]: [
                        {
                            startDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        },
                        {
                            endDate: {
                                [Op.between]: [startDate, endDate]
                            }
                        }
                    ]
                }
            ]
        }
    })

    if(currentBookings.length > 0){
        return next({
            status:403,
            message: "Sorry, this spot is already booked for the specified dates",
            statusCode: 403,
            errors: {
                "startDate": "Start date conflicts with an existing booking",
                "endDate": "End date conflicts with an existing booking"
            }
        })
    }


    desiredBooking.update({
        startDate: startDate,
        endDate: endDate
    })

    res.status(200)
    res.json(desiredBooking)
})



///// delete a booking /////

router.delete('/:bookingId', requireAuth, async (req,res,next) => {
    const bookingId = req.params.bookingId;
    const userId = req.user.id;

    const desiredBooking = await Booking.findByPk(bookingId)

    const findOwnerOrUser = await Booking.findByPk(bookingId, {
        include: [
            {
                model: Spot
            }
        ]
    })

    // no booking
    if(!desiredBooking){
        return next({
            status:404,
            message: "Booking couldn't be found",
            statusCode: 404,
        })
    }


    ///not the owner of spot or user booking
    // if(userId !== desiredBooking.userId || userId !== findOwnerOrUser.Spot.ownerId){
    //     return next({
    //         status:403,
    //         message: "You cannot delete this booking",
    //         statusCode: 403,
    //     })
    // }

    //booking has started
    const currentDate = new Date()
    const bookingStartDate = new Date(desiredBooking.startDate)
    if(bookingStartDate < currentDate){
        return next({
            status:403,
            message: "Bookings that have been started can't be deleted",
            statusCode: 403,
        })
    }
    if(userId === desiredBooking.userId || userId === findOwnerOrUser.Spot.ownerId){
        await desiredBooking.destroy()
        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })

    }

    return next({
        status:403,
        message: "You cannot delete this booking",
        statusCode: 403,
    })

})


module.exports = router;
