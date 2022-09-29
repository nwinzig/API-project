const express = require('express');
require('express-async-errors');
const morgan = require('morgan');
const cors = require('cors');
const csurf = require('csurf');
const helmet = require('helmet');
const cookieParser = require('cookie-parser');
const routes = require('./routes')

const { ValidationError } = require('sequelize')

const { environment } = require('./config');
const isProduction = environment === 'production';

const app = express();

app.use(morgan('dev'));

app.use(cookieParser());
app.use(express.json());

//security middleware

    //cors
    if(!isProduction){
        app.use(cors())
    }

    //helmt, helps with xss
    app.use(
        helmet.crossOriginResourcePolicy({
            policy: 'cross-origin'
        })
    )

    //csurf
    app.use(
        csurf({
            cookie: {
                secure: isProduction,
                sameSite: isProduction && 'Lax',
                httpOnly: true
            }
        })
    )
app.use(routes);


//error handlers

app.use((req,res,next) => {
    const err = new Error("The requested resource couldn't be found.")
    err.title = 'Resource not found';
    err.errors = ["The requested resource couldn't be found."];
    err.status = 404
    next(err)
});



app.use((err,req,res,next) => {
    if(err instanceof ValidationError){
        err.errors = err.errors.map((e) => e.message);
        err.title = 'Validation error'
    }
    next(err)
});

app.use((err,req,res,next) => {
    res.status(err.status || 500);
    console.error(err);
    res.json({
        // title: err.title || 'Server Error',
        message: err.message,
        statusCode: err.statusCode,
        errors: err.errors,
        // stack: isProduction ? null : err.stack
    })
});



module.exports = app;
