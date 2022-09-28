const express = require('express')
const { setTokenCookie, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');
const router = express.Router();


const validateSignup = [
    check('firstName')
        .exists({ checkFalsy: true })
        .withMessage("First Name is required"),
    check('lastName')
        .exists({ checkFalsy: true })
        .withMessage("Last Name is required"),
    check('email')
        .exists({ checkFalsy: true })
        .isEmail()
        .withMessage('Please provide a valid email.'),
    check('username')
        .exists({ checkFalsy: true })
        .withMessage( "Username is required"),
    check('username')
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

    if(!req.body){
        return next({
            message: "Validation error",
            status: 400,
            errors: {
                "email": "Invalid email",
                "username": "Username is required",
                "firstName": "First Name is required",
                "lastName": "Last Name is required"}
        })
    }

    let existingEmail = await User.findAll(
        {
            where: {
                email: email,
            }
        }
    )

    if(existingEmail.length >= 1){
        let error = new Error()
            error.message = "User already exists"
            error.status = 403
            error.errors = {
                "email": "User with that email already exists"
            }
            return next(error)
    }

    let existingUsername = await User.findAll(
        {
            where: {
                username: username,
            }
        }
    )

    if(existingUsername.length >= 1){
        // let error = new Error()
        // error.message = "User already exists"
        // error.status = 403
        // error.errors = {
        //     "email": "User with that username already exists"
        // }
        return next({
            message: "User already exists",
            status: 403,
            errors: {
                "username": "User with that username already exists"}
        })
    }


    const user = await User.signup({ firstName,lastName, email, username, password });


    let token = await setTokenCookie(res, user);

    user.toJSON()
    user.firstName = firstName;
    user.lastName = lastName;
    user.token = token;

    return res.json(
    user
    );
}
);



module.exports = router;
