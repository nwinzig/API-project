
const express = require('express');
const sequelize = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
const { Booking } = require('../../db/models')
const { User } = require('../../db/models')
const { ReviewImage } = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');


//add image to a review based on review id

router.post('/:reviewId/images', requireAuth, async (req,res,next) => {
    const { url } = req.body;
    const userId = req.user.id;
    let reviewId = req.params.reviewId;

    //find review
    let desiredReview = await Review.findByPk(reviewId)

    if(!desiredReview){
        return next({
            status: 404,
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }
    if(desiredReview.userId !== userId){
        return next({
            status:404,
            message: "You cannot add to this review",
            statusCode: 404,
        })
    }

    //find existing images

    let images = await ReviewImage.count({
        where: {
            reviewId: reviewId
        }
    })
    if(images > 10){
        return next({
            status:403,
            message: "Maximum number of images for this resource was reached",
            statusCode: 403,
        })
    }


    let newReview = await ReviewImage.create({
        'reviewId': reviewId,
        'url': url
    })

    let returnInfo = {
        id: newReview.id,
        url: url
    }

    res.status(200);
    res.json(
        returnInfo
    )
})


//////// get all reviews of current user /////

router.get('/current', requireAuth, async (req,res,next) => {
    const userId = req.user.id;

    let allReviews = await Review.findAll({
        where:{
            userId: userId
        },
        include: [
            {
                model: User,
                attributes: ['id','firstName', 'lastName']
            },
            {
                model: Spot,
                attributes: {
                    exclude: ['description', 'createdAt', 'updatedAt']
                },
                include: [
                    {
                    model: SpotImage,
                    attributes: ['url']
                    }
                ]
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    let everyReview = [];

    allReviews.forEach(review => {
        everyReview.push(review.toJSON())
    })
    if(!everyReview[0]){
        everyReview= "This user does not have any reviews"
        res.status(404)
        res.json({"Reviews": everyReview})
    }
    everyReview.forEach(async (review) => {
        if(!review.Spot.SpotImages[0]){
            review.Spot.previewImage = "There are no images for this spot"
        }
        if(!review.ReviewImages[0]){
            review.ReviewImages = "There are no review images for this spot"
        }
        let imagesIndex = review.Spot.SpotImages.length-1
        review.Spot.previewImage = review.Spot.SpotImages[imagesIndex].url
        delete review.Spot.SpotImages

        console.log(review)
        console.log(review.Spot.SpotImages)
    })



    // allReviews.forEach(async (review) => {
    //     // console.log(userId)
    //     let desiredSpot = review.Spot
    //     let spotId = review.Spot.id
    //     // console.log(desiredSpot)
    //     desiredSpot = desiredSpot.toJSON()
    //     console.log(spotId)
    //     let image = await SpotImage.findAll({
    //         where: {
    //             spotId: spotId,
    //             preview: true
    //         }
    //     })
    //     console.log("image", image[0].toJSON())
    //     console.log("desired spot",desiredSpot)

    //     if(!image){
    //         desiredSpot.previewImage = "There are no images for this spot"
    //         console.log('here')
    //         review.Spot.dataValues.previewImage = "There are no images for this spot"
    //     }
    //     if(image){
    //         image = image[0].toJSON()
    //         desiredSpot.previewImage = image.url
    //         console.log('here3')
    //         review.Spot.dataValues.previewImage = image.url
    //         console.log(review.toJSON())
    //     }
    //     // if(review.Spot.SpotImages[0]){
    //     //     desiredSpot.previewImage = review.Spot.SpotImages[0].dataValues.url
    //     //     console.log('here')
    //     //     review.Spot.dataValues.previewImage = review.Spot.SpotImages[0].dataValues.url
    //     //     console.log("desired spot------->",desiredSpot)
    //     //     let images = desiredSpot.SpotImages
    //     //     console.log('images before', images)
    //     //     // images.forEach(object => {
    //     //     //     delete object
    //     //     // })
    //     //     images = images.pop()
    //     //     console.log('images after', images)
    //     //     desiredSpot.SpotImages = images
    //     //     delete desiredSpot.SpotImages
    //     //     console.log('after images stuff',desiredSpot)

    //     //     console.log('after after', review)
    //         // console.log("pushing",desiredSpot.SpotImages.slice())
    //         // let deleteItems = desiredSpot.SpotImages.shift()
    //         // console.log("deleting", deleteItems)
    //         // // console.log(desiredSpot.SpotImages)
    //         // delete desiredSpot.SpotImages
    //         // delete review.Spot.SpotImages
    //         // }

    //     // console.log("review",review.toJSON())
    //     // console.log(!review.ReviewImages[0])
    //     // if(!review.ReviewImages[0]){
    //     //     review = review.toJSON()
    //     //     // console.log("just the whole review",review)
    //     //     review.ReviewImages.id = "There are no images for this review"
    //     //     review.ReviewImages.url = "There is no image for this review"
    //     //     // review.ReviewImages.url = "Please provide an image"
    //     //     // console.log(review.ReviewImages)
    //     //     // review.ReviewImages[0] = review.ReviewImages
    //     //     // delete review.ReviewImages
    //     //     // review.ReviewImages = "There are no images for this review"
    //     // }
    //     console.log('here2')
    // })


    res.status(200)
    res.json({"Reviews": everyReview})
})



/////// edit a review //////

router.put('/:reviewId', requireAuth, async (req,res,next) => {
    const userId = req.user.id;
    const { review, stars } = req.body;
    const reviewId = req.params.reviewId;

    if(!review || !stars){
        return next({
            status:400,
            "message": "Validation Error",
            statusCode: 400,
            "errors": {
                "review": "Review text is required",
                "stars": "Stars must be an integer from 1 to 5",
            }
            })
    }

    star = parseInt(stars);

    let desiredReview = await Review.findByPk(reviewId)

    if(!desiredReview){
        return next({
            status: 404,
            message: "Review couldn't be found",
            statusCode: 404,
        })
    }


    desiredReview.update({
        "review": review,
        "stars": star
    })

    res.status(200)
    res.json(desiredReview)
})



/////// delete a review /////


router.delete('/:reviewId',requireAuth, async (req,res,next) => {
    const reviewId = req.params.reviewId;
    const userId = req.user.id;

    let desiredReview = await Review.findByPk(reviewId)

    //for no review
    if(!desiredReview){
        return next({
            status:404,
            "message": "Review couldn't be found",
            statusCode: 404
            })
    }


    //if user is not owner
    if(userId !== desiredReview.userId){
        return next({
            status:403,
            "message": "You cannot delete this image",
            statusCode: 403
            })
    }

    await desiredReview.destroy()
    res.status(200)
    res.json({
        "message": "Successfully deleted",
        "statusCode": 200
    })

})



module.exports = router;
