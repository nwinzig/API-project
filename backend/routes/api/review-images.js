const express = require('express');
const {Sequelize, Op} = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models')
const { Review } = require('../../db/models');
const { ReviewImage } = require('../../db/models')
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { Booking } = require('../../db/models')

////// delete a review image /////


router.delete('/:imageId', requireAuth, async (req,res,next) => {
    const imageId = req.params.imageId;
    const userId = req.user.id;


    let desiredImage = await ReviewImage.findByPk(imageId)

    if(!desiredImage){
        return next({
            status:404,
            "message": "Spot Image couldn't be found",
            statusCode: 404
            })
    }

    let findingOwner = await ReviewImage.findByPk(imageId, {
        include: [
            {
                model: Review,
            }
        ]
    })
    findingOwner = findingOwner.toJSON()

        //if user is not owner
        if(userId !== findingOwner.Review.userId){
            return next({
                status:403,
                "message": "You cannot delete this image",
                statusCode: 403
                })
        }

        await desiredImage.destroy()
        res.status(200)
        res.json({
            "message": "Successfully deleted",
            "statusCode": 200
        })

})


module.exports = router
