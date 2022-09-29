
const express = require('express');
const sequelize = require('sequelize')
const { Spot } = require('../../db/models');
const { SpotImage } = require('../../db/models');
const { Review } = require('../../db/models');
// const spot = require('../../db/models/spot');
const {User} = require('../../db/models')
const router = express.Router();
const { setTokenCookie, restoreUser, requireAuth } = require('../../utils/auth');




module.exports = router;
