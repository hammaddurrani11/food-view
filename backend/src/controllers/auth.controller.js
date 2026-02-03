const userModel = require("../models/user.model");
const foodPartnerModel = require('../models/foodpartner.model');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');

async function registerUser(req, res) {
    const { fullName, email, password } = req.body;

    const userExisted = await userModel.findOne({ email });

    if (userExisted) {
        return res.status(400).json({
            message: "User Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userModel.create({
        fullName,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: user._id,
    }, process.env.SECRET_KEY);

    res.cookie('token', token);

    res.status(201).json({
        message: 'User Created Successfully',
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

async function loginUser(req, res) {
    const { email, password } = req.body;

    const user = await userModel.findOne({
        email
    });

    if (!user) {
        return res.status(400).json({
            message: "Incorrect Email or Password"
        })
    }

    const isPasswordValid = bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
        return res.status(400).json({
            message: "Incorrect Email or Password"
        })
    }

    const token = jwt.sign({
        id: user._id
    }, process.env.SECRET_KEY);

    res.cookie('token', token);

    res.status(200).json({
        message: "User logged in Successfully",
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName
        }
    })
}

function logoutUser(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: "User logged out Successfully"
    })
}

async function registerFoodPartner(req, res) {
    const { name, email, password } = req.body;

    const isUserExists = await foodPartnerModel.findOne({
        email
    });

    if (isUserExists) {
        return res.status(400).json({
            message: "Email Already Exists"
        })
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const foodPartner = await foodPartnerModel.create({
        name,
        email,
        password: hashedPassword
    });

    const token = jwt.sign({
        id: foodPartner._id
    }, process.env.SECRET_KEY);

    res.cookie('token', token);

    res.status(201).json({
        message: "Food Partner Created Successfully",
        foodPartner: {
            name: name,
            email: email,
            id: foodPartner._id
        }
    })
}

async function loginFoodPartner(req, res) {
    const { email, password } = req.body;

    const isEmailExists = await foodPartnerModel.findOne({
        email
    });

    if (!isEmailExists) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const isPasswordCorrect = bcrypt.compare(password, isEmailExists.password);

    if (!isPasswordCorrect) {
        return res.status(400).json({
            message: "Invalid Email or Password"
        })
    }

    const token = jwt.sign({
        id: isEmailExists._id
    }, process.env.SECRET_KEY);

    res.cookie('token', token);

    res.status(200).json({
        message: "Logged in Successfully",
        foodPartner: {
            id: isEmailExists._id,
            email: isEmailExists.email
        }
    })
}

function logoutFoodPartner(req, res) {
    res.clearCookie('token');
    res.status(200).json({
        message: "Food Partner logged out Successfully"
    })
}

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    registerFoodPartner,
    loginFoodPartner,
    logoutFoodPartner,
}