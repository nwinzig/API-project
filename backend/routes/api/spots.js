const express = require('express');
const {Sequelize, Op} = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
// const spot = require('../../db/models/spot');
const { ReviewImage } = require('../../db/models')
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models')


////////// get all spots /////////

router.get('/', async (req,res,next) => {

    let { page, size, minLat, maxLat, minLng, maxLng, minPrice, maxPrice} = req.query;
    if(!page){
        page = 1
    }
    if(page > 10){
        page = 1
    }
    if(!size){
        size = 20
    }
    if(size > 20){
        size = 20
    }
    // console.log(page, size)
    let pagination = {};
    if(page >= 1 && size >= 1){
        pagination.offset = size * (page-1)
        pagination.limit = size
    }

    let where = {};

    if (minLat) {
        if (isNaN(minLat)) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.lat = {[Op.gte]: minLat}
    }

    if (maxLat) {
        if (isNaN(maxLat)) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.lat = {[Op.lte]: maxLat}
    }

    if (minLng) {
        if (isNaN(minLng)) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.lng = {[Op.gte]: minLng}
    }
    if (maxLng) {
        if (isNaN(maxLng)) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.lng = {[Op.lte]: maxLng}
    }
    if (minPrice) {
        if (isNaN(minPrice) || minPrice < 0) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.price = {[Op.gte]: minPrice}
    }
    if (maxPrice) {
        if (isNaN(maxPrice) || maxPrice < 0) {
            return next({
                "message": "Validation Error",
                "statusCode": 400,
                status: 400,
                "errors": {
                    "page": "Page must be greater than or equal to 1",
                    "size": "Size must be greater than or equal to 1",
                    "maxLat": "Maximum latitude is invalid",
                    "minLat": "Minimum latitude is invalid",
                    "minLng": "Maximum longitude is invalid",
                    "maxLng": "Minimum longitude is invalid",
                    "minPrice": "Maximum price must be greater than or equal to 0",
                    "maxPrice": "Minimum price must be greater than or equal to 0"
                }
            })
        }
        where.price = {[Op.lte]: maxPrice}
    }
    const spots = await Spot.findAll({
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
            ],
            ...pagination,
            where
        })
    //finding preview image url
    let allSpots = [];

    spots.forEach(spot => {
        allSpots.push(spot.toJSON())
    });

    allSpots.forEach(spot => {
        spot.SpotImages.forEach(image => {

            if(image.preview === true){
            spot.previewImage = image.url
            // console.log("this should set the image url",image.url)
        }
            if(!image && image.preview === false){
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
        // if(!spot.Reviews[0]){
        //     spot.Reviews = "There are currently no reviews for this spot."
        // }
        if(spot.Reviews[0]){
        let sum = 0;
        let count = 0;
        spot.Reviews.forEach(review => {
            if(review.stars){
            sum += review.stars;
            count++
            delete spot.Reviews;
        }
        })
        // console.log(sum)
        // console.log(count)

        let avg = sum/count;
        avg = avg.toFixed(2)
        // using fixed and parsefloat to keep num at 2 decimal places while being an integer
        avg = parseFloat(avg)
        if(!isNaN(avg)){
            spot.avgRating = avg
        }
        }
        //no reviews
            if(!spot.avgRating){
            spot.avgRating = "No Reviews"
            delete spot.Reviews
        }

    })


    allSpots.forEach(spot => {
        spot.price = parseFloat(spot.price)
    })

    //return

    res.json({"Spots": allSpots, "Page": page, "Size": size})
    // res.json({"Spots": spots})
} )



////////  create a spot //////////

router.post('/', requireAuth, async (req,res,next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const userId = req.user.id;
    console.log("******************",req.body)
    if(!address || !city || !state || !country || !name || !description || !price){

        return next({
            status:400,
            "message": "Validation Error",

            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
            })
    }



    let newSpot = await Spot.create({
        "ownerId": userId,
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "lat": lat,
        "lng": lng,
        "name": name,
        "description": description,
        "price": price
    })
    res.status(201)
    res.json(newSpot)
})

//////// create a image for a spot ////////

router.post('/:spotId/images',requireAuth, async (req,res,next) => {
    const { url, preview } = req.body;
    const spotId = req.params.spotId;

    const findSpot = await Spot.findByPk(spotId)

    if(!findSpot){
        return next({
            status:404,
            "message": "Spot couldn't be found",
            statusCode: 404
            })
    }

    let newSpotImage = await SpotImage.create({
        'spotId': req.params.spotId,
        "url": url,
        "preview": preview,
    })

    const returnInfo = {
        id: newSpotImage.id,
        url: url,
        preview: preview
    }
    res.status(200)
    res.json(
        returnInfo
    )
})

////// get spots for current user /////

router.get('/current', requireAuth, async (req,res,next) => {

    const userId = req.user.id;
    // console.log(userId)

    const spots = await Spot.findAll(
        {
            where: {
                ownerId: userId
            },
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
        //seperate each spot in an array
    let allSpots = [];

    spots.forEach(spot => {
        allSpots.push(spot.toJSON())
    });


    //finding average rating
    allSpots.forEach(spot => {
        //if there aren't reviews
        // console.log(spot.Reviews.length)
        // console.log(spot.Reviews)
        // if(spot.Reviews.length === 0){
        //     delete spot.Reviews;
        //     spot.avgRating = "There are currently no Reviews for this Spot."
        // }
        // console.log(!spot.Reviews[0])
            if(!spot.Reviews[0]){
                spot.avgRating = "There are currently no reviews for this spot."
            }
        //if there are reviews
        let sum = 0;
        let count = 0;

        spot.Reviews.forEach(review => {
            if(review.stars){
            sum += review.stars;
            count++
            delete spot.Reviews;
        }
        })
        const avg = sum/count;

//from here till 411 cause merge conflict
        // console.log('inside rating pt 1')
            //spot.Reviews.forEach(review => {
                // console.log("here",review.stars)
               // if(review.stars){
                   // sum += review.stars;
                   // count++
                    // delete spot.Reviews;
               // }
           // })


            // const avg = sum/count;
            if(!isNaN(avg)){
                spot.avgRating = avg
            }
            // console.log(spot.Reviews[0])
        //for no reviews, remove review property
        // if(!spot.Reviews.stars){
        //     spot.avgRating = "There are currently no Reviews for this Spot."
        //     delete spot.Reviews
        // }
            delete spot.Reviews
        })
        // console.log('before spot')
        //finding preview image url
        allSpots.forEach(spot => {
            // console.log('in spot pt1')
            // console.log(spot.SpotImages)
            // console.log(spot)
            // console.log(!spot.SpotImages[0])
            if(!spot.SpotImages[0]){
                spot.previewImage = "There are currently no images for this spot."
            }
            if(spot.SpotImages[0]){
            spot.SpotImages.forEach(image => {
                // console.log('in spot pt2')
                if(image.preview === true){
                spot.previewImage = image.url
            }
                if(image.preview === false){
                    spot.previewImage = "No image url"
                }
            })
        }

            delete spot.SpotImages;
        })

    //return

    res.json({"Spots": allSpots})

})

//// get all reviews by a spot id ////

router.get('/:spotId/reviews', async (req,res,next) => {
    let spotId = req.params.spotId;
    spotId = parseInt(spotId)

    let reviews = await Review.findAll({
        where: {
            spotId: spotId
        },
        include: [
            {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    // if(reviews.length < 1){
    //     return next({
    //         status:404,
    //         "message": "No Reviews",
    //         statusCode: 404
    //         })
    // }

    // console.log(reviews)
    let allreviews = [];
    reviews.forEach(review => {
        allreviews.push(review.toJSON())
    })
    // console.log(allreviews)
    allreviews.forEach(review => {
        if(!review.ReviewImages[0]){
            review.ReviewImages = "There are no review images for this review"
        }
    })
    res.status(200)
    res.json({"Reviews": allreviews})
})




/////// get all bookings for a spot based on spot id //////


router.get('/:spotId/bookings', requireAuth, async (req,res,next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    let requestedSpot = await Spot.findByPk(spotId)

    //no spot
    if(!requestedSpot){
        return next({
            status:404,
            "message": "Spot couldn't be found",
            statusCode: 404
        })
    }
    let requestedBookings = await Booking.findAll({
        where: {
            spotId: spotId,
        },
        attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt']
    })

    //if your the owner
    // console.log('user---', userId)
    // console.log('owner---', requestedSpot.ownerId )


    if(userId === requestedSpot.ownerId){
        // //seperate bookings in array
        // let allBookings = [];
        // // requestedBookings.forEach(booking => {
        // //     allBookings.push(booking.toJSON())
        // // })
        // //return the booking with details on user that booked
        // requestedBookings.forEach(async (booking) => {
        //     //user id that booked
        //     booking = booking.toJSON()
        //     let bookingUser = booking.userId
        //     //find user that booked
        //     let renter = await User.findByPk(bookingUser, {
        //         attributes: ['id', 'firstName', 'lastName']
        //     })
        //     //add renter to their booking

        //     console.log("just the booking ------ ", booking)
        //     // let user = {}
        //     // user.id = renter.id;
        //     // user.firstName = renter.firstName;
        //     // user.lastName = renter.lastName
        //     renter = renter.toJSON()
        //     console.log('just the renter---', renter)
        //     booking.User = renter
        //     console.log('testing object', booking)
        //     // booking.User = user
        //     // console.log("the booking afte the fact=-=---", booking)
        //     // booking.User.id = renter.id
        //     // booking.User.firstName = renter.firstName
        //     // booking.User.lastName = renter.lastName
        // })

        let requestedBookings = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            attributes: ['id', 'spotId', 'userId', 'startDate', 'endDate', 'createdAt', 'updatedAt'],
            include: {
                model: User,
                attributes: ['id', 'firstName', 'lastName']
            }
        })

        res.status(200)
        res.json({"Bookings":requestedBookings})
    }

    if(userId !== requestedSpot.ownerId){
        let requestedBookings = await Booking.findAll({
            where: {
                spotId: spotId,
            },
            attributes: ['spotId','startDate', 'endDate'],
        })

        res.status(200)
        res.json({"Bookings":requestedBookings})
    }




})





///// create a booking from a spots id ////

router.post('/:spotId/bookings', requireAuth, async (req,res,next) => {
    const { startDate, endDate } = req.body;
    let userId = req.user.id;
    let spotId = req.params.spotId;

    //validation
    if(!startDate || !endDate || endDate <= startDate){
        return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "endDate": "endDate cannot be on or before startDate"
            }
            })
    }

    const desiredSpot = await Spot.findByPk(spotId)

    //doesn't exist
    if(!desiredSpot){
        return next({
            status:404,
            "message": "Spot couldn't be found",
            statusCode: 404
            })
    }

    //error if they own it
    if(desiredSpot.ownerId === userId){
        return next({
            status:404,
            "message": "You cannot book a stay at a spot you own",
            statusCode: 404
            })
    }

    //find current bookings that conflict with desired booking
    const currentBookings = await Booking.findAll({
        where: {
            spotId: spotId
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
        "message": "Sorry, this spot is already booked for the specified dates",
        statusCode: 403,
        "errors": {
            "startDate": "Start date conflicts with an existing booking",
            "endDate": "End date conflicts with an existing booking"
            }
        })
}
// console.log(currentBookings)
//create the new booking

    let newBooking = await Booking.create({
        "spotId": spotId,
        "userId": userId,
        "startDate": startDate,
        "endDate": endDate
    })

    res.status(200)
    res.json(
        newBooking
    )
})





///// get details for a spot from an id ////

router.get('/:spotId', async (req,res,next) => {
    const spotId = req.params.spotId;

    let spots = await Spot.findByPk(spotId,
        {
            include: [
                // {
                //     model: Review,

                // },
                {
                    model: SpotImage,
                    attributes: {
                        exclude: ['createdAt', 'updatedAt', 'spotId']
                    }
                },
                {
                    model: User,
                    as: 'Owner',
                    attributes: ['id','firstName', 'lastName']
                }
            ]
        }
    )
    if(!spots){

        return next({
            message: "Spot couldn't be found",
            statusCode: 404,
            status: 404
            })
        }
        spots = spots.toJSON()

        // console.log(spots)
        if(!spots.SpotImages[0]){
            // console.log('here')
            spots.SpotImages = "There are currently no images for this spot"
        }


        let results = {...spots};

        let numReviews;


        let totalreviews = await Review.count(
            {
                where: {
                    spotId: spotId
                }
            }
        )
            // console.log("do we make it here 1")
        let avgReviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            // attributes: {
            //     include: [
            //     [Sequelize.fn("AVG", Sequelize.col('stars')), "avgRating"]
            //     ]
            // },
            // group: ['Review.Id']
        })
        // console.log(avgReviews)
        let reviewArr = []
        avgReviews.forEach(review => {
            reviewArr.push(review.toJSON())
        })
        // console.log(reviewArr)
        let sum = 0;
        let count = 0;
        reviewArr.forEach(review => {

            sum += review.stars
            count++
        })

        // there was a merge conflict with these two lines that should go with lines 770-775
        // results.avgStarReviews = avgReviews[0].dataValues.avgRating;
        // results.numReviews = totalreviews;

        // console.log(sum,count)
        let avgStarReviews = sum/count


        // console.log( Math.round(avgStarReviews * 100) / 100)
        // console.log(' do we make it here 2')
        // console.log(avgReviews[0].dataValues)
        // console.log('break between console logs')
        // console.log(avgReviews[0].dataValues.avgRating)
        // avgStarReviews = avgReviews[0].dataValues.avgRating
        // console.log(Math.round(avgStarReviews * 100) / 100)
        // results.avgStarReviews = avgReviews[0].dataValues.avgRating;

        // console.log(totalreviews)
        if(totalreviews>0){
        results.avgStarReviews = Math.round(avgStarReviews * 100) / 100
        }
        if(count < 1){
            results.avgStarReviews = 0
        }
        results.numReviews = count;

        // console.log(avgReviews)
        // console.log('do we make it here 3')
    // let allSpots = [];
    // spots.forEach(spot => {
    //     allSpots.push(spot.toJSON())
    // });
    // allSpots.forEach(spot => {
    //     let sum = 0;
    //     let count = 0;
    //     spot.Reviews.forEach(review => {
    //         if(review.stars){
    //         sum += review.stars;
    //         count++
    //         delete spot.Reviews;
    //     }
    //     })
    //     const avg = sum/count;
    //     if(!isNaN(avg)){
    //         spot.avgStarRating = avg
    //         spot.numReviews = count
    //     }
    // })

    //return

    res.json(results)
})


////////// edit a spot ///////

router.put('/:spotId', requireAuth, async (req,res,next) => {
    const { address, city, state, country, lat, lng, name, description, price } = req.body;
    const spotId = req.params.spotId
    const userId = req.user.id;

    //validation error
    if(!address || !city || !state || !country || !name || !description || !price){
        return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "name": "Name must be less than 50 characters",
                "description": "Description is required",
                "price": "Price per day is required"
            }
            })
    }
  //find spot
    let desiredSpot = await Spot.findByPk(spotId)
    //couldn't find spot or isnt valid owner

    if(!desiredSpot){
        return next({
            message: "Spot couldn't be found",
            statusCode: 404,
            status: 404
        })
    }
    if(desiredSpot.ownerId !== userId){
        return next({
            message: "You cannot change this spot",
            statusCode: 404,
        })
    }

    desiredSpot.update({
        "address": address,
        "city": city,
        "state": state,
        "country": country,
        "lat": lat,
        "lng": lng,
        "name": name,
        "description": description,
        "price": price
    })
    desiredSpot = desiredSpot.toJSON()

    res.status(200)
    res.json(
        desiredSpot
    )
})



//////// create a review for a spot based on id ////

router.post('/:spotId/reviews', requireAuth, async (req,res,next) => {

    const { review, stars } = req.body;
    const userId = req.user.id;
    let spotId = req.params.spotId

    // if(!review || !stars){
    //     return next({
    //         status:400,
    //         "message": "Validation Error",
    //         statusCode: 400,
    //         "errors": {
    //             "review": "Review text is required",
    //             "stars": "Stars must be an integer from 1 to 5",
    //         }
    //         })
    // }
    if(!stars){
                return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "stars": "Stars must be an integer from 1 to 5"
            }
            })
    }
    if(!review){
                return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "review": "Review text is required"
            }
            })
    }
    spotId = parseInt(spotId)

    const desiredSpot = await Spot.findByPk(spotId)

    if(!desiredSpot){
        return next({
            status: 404,
            message: "Spot couldn't be found",
            statusCode: 404,
        })
    }

    const findPastReview = await Review.findAll({
        where:{
            spotId: spotId,
            userId: userId
        }
    })

    if(findPastReview.length>0){
        return next({
            status:403,
            message: "User already has a review for this spot",
            statusCode: 403,
        })
    }


    let newReview = await Review.create({
        "userId": userId,
        "spotId": spotId,
        "review": review,
        "stars": stars
    })
    res.status(201)
    res.json(newReview)

})


////// delete a spot /////


router.delete('/:spotId',requireAuth, async (req,res,next) => {
    const spotId = req.params.spotId;
    const userId = req.user.id;

    let desiredSpot = await Spot.findByPk(spotId)

    //for no spot
    if(!desiredSpot){
        return next({
            status:404,
            "message": "Spot couldn't be found",
            statusCode: 404
            })
    }
    // console.log(userId)
    // console.log(desiredSpot.ownerId)

    //if user is not owner
    if(userId !== desiredSpot.ownerId){
        return next({
            status:403,
            "message": "You cannot delete this Spot",
            statusCode: 403
            })
    }

    await desiredSpot.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})




module.exports = router;
