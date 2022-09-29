
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
                }
            },
            {
                model: ReviewImage,
                attributes: ['id', 'url']
            }
        ]
    })

    allReviews.forEach(review => {
        let desiredSpot = review.Spot
        desiredSpot = desiredSpot.toJSON()
        desiredSpot.previewImage = review.ReviewImages[0].dataValues.url


        review.Spot.dataValues.previewImage = review.ReviewImages[0].dataValues.url


    })


    res.status(200)
    res.json({"Reviews": allReviews})
})



module.exports = router;
