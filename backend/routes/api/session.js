const express = require('express')

const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');
const { User } = require('../../db/models');


const router = express.Router();
const { check } = require('express-validator');
const { handleValidationErrors } = require('../../utils/validation');

//validate login

const validateLogin = [
    check('credential')
        .exists({ checkFalsy: true })
        .notEmpty()
        .withMessage('Please provide a valid email or username.'),
    check('password')
        .exists({ checkFalsy: true })
        .withMessage('Please provide a password.'),
    handleValidationErrors
];

router.post('/', async (req, res, next) => {
    const { credential, password } = req.body;

    if(!credential || !password){
        return next({
            message: "Validation Error",
            status: 400,
            errors: {
                "credential": "Email or username is required",
                "password": "Password is required"
            }
        })
    }

    const user = await User.login({ credential, password });

    if (!user) {
    const err = new Error('Login failed');
    err.status = 401;
    err.title = 'Login failed';
    err.errors = ['The provided credentials were invalid.'];
    return next(err);
    }

    await setTokenCookie(res, user);

    return res.json({
        "id": user.id,
        "firstName": user.firstName,
        "lastName": user.lastName,
        "email": user.email,
        "username": user.username,
        "token": ""
    });

});

// log out

router.delete('/',(_req, res) => {
        res.clearCookie('token');
        return res.json({ message: 'success' });
    }
);

//restore session user

router.get('/', requireAuth, (req, res) => {
    const { user } = req;
    if (user) {
        console.log(user)
        return res.json({
            "id": user.id,
            "firstName": user.firstName,
            "lastName": user.lastName,
            "email": user.email,
            "username": user.username
        });
    } else return res.json({});
}
);


module.exports = router;
