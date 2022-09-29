const express = require('express');
const sequelize = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
const spot = require('../../db/models/spot');
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');

////////// get all spots /////////

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



////////  create a spot //////////

router.post('/', requireAuth, async (req,res,next) => {
    const {address, city, state, country, lat, lng, name, description, price} = req.body;
    const userId = req.user.id;

    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){

        return next({
            status:400,
            "message": "Validation Error",

            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
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
    res.status(200)
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
    console.log(userId)

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
            message: "User already exists",
            statusCode: 404,
            })
        }
        spots = spots.toJSON()
        let results = {...spots};

        let numReviews;


        let totalreviews = await Review.count(
            {
                where: {
                    spotId: spotId
                }
            }
        )

        let avgReviews = await Review.findAll({
            where: {
                spotId: spotId
            },
            attributes: [
                [sequelize.fn("AVG", sequelize.col('stars')), "avgRating"]
            ]

        })

        results.avgStarReviews = avgReviews[0].dataValues.avgRating;
        results.numReviews = totalreviews;
        console.log(avgReviews)
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
    if(!address || !city || !state || !country || !lat || !lng || !name || !description || !price){
        return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "address": "Street address is required",
                "city": "City is required",
                "state": "State is required",
                "country": "Country is required",
                "lat": "Latitude is not valid",
                "lng": "Longitude is not valid",
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


module.exports = router;