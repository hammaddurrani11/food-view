const jwt = require('jsonwebtoken');
const foodPartnerModel = require('../models/foodpartner.model');
const userModel = require('../models/user.model');

async function foodPartnerAuthMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized Access'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const foodPartner = await foodPartnerModel.findById(decoded.id);

        req.foodPartner = foodPartner;

        next();

    } catch (error) {
        return res.status(401).json({
            meesage: 'Invalid Token'
        })
    }
}

async function userAuthMiddleware(req, res, next) {
    const token = req.cookies.token;

    if (!token) {
        return res.status(401).json({
            message: 'Unauthorized Access'
        })
    }

    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY);

        const user = await userModel.findById(decoded.id);

        req.user = user;

        next();

    } catch (err) {
        return res.status(401).json({
            message: 'Invalid Token'
        })
    }
}

module.exports = {
    foodPartnerAuthMiddleware,
    userAuthMiddleware
}