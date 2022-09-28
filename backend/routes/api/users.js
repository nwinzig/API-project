const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


const validateSignup = [
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .isLength({ min: 4 })
        .withMessage('Please provide a username with at least 4 characters.'),
    check('username')
        .not()
        .isEmail()
        .withMessage('Username cannot be an email.'),
    check('password')
        .exists({ checkFalsy: true })
        .isLength({ min: 6 })
        .withMessage('Password must be 6 characters or more.'),
    handleValidationErrors
];


//sign up
router.post('/', validateSignup, async (req, res, next) => {
    const { firstName, lastName, email, password, username } = req.body;

    let existingEmail = User.findAll(
        {
            where: {
                email: email,
            }
        }
    )

    if(existingEmail.length >= 1){
        let error = new Error()
            error.message = "User already exists"
            error.statusCode = 403
            error.errors = {
                "email": "User with that email already exists"
            }
            return next(error)
    }

    let existingUsername = User.findAll(
        {
            where: {
                username: username,
            }
        }
    )

    if(existingUsername.length >= 1){
        let error = new Error()
        error.message = "User already exists"
        error.statusCode = 403
        error.errors = {
            "email": "User with that username already exists"
        }
        return next(error)
    }


    const user = await User.signup({ email, username, password,firstName,lastName, });


    let token = await setTokenCookie(res, user);
    console.log("this is a test ////////////-----",user)
    user.token = token
    return res.json(
        user
    );
}
);



module.exports = router;
