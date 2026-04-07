const foodItemModel = require('../models/food.model');
const likeModel = require('../models/like.model');
const saveModel = require('../models/save.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No video file provided' });
        }

        const fileUploadResult = await storageService.uploadFile(req.file.buffer, uuid());

        const foodItem = await foodItemModel.create({
            name: req.body.name,
            description: req.body.description,
            video: fileUploadResult.url,
            foodPartner: req.foodPartner._id,
        });

        res.status(201).json({
            message: 'Food item created successfully',
            food: foodItem
        })

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }

}

async function getFoodItems(req, res) {
    const foodItems = await foodItemModel.find({})
    res.status(200).json({
        message: 'Food items fetched successfully',
        foodItems
    })
}

async function likedFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadyLiked = await likeModel.findOne({
            user: user._id,
            food: foodId
        })

        if (isAlreadyLiked) {
            await likeModel.deleteOne({
                user: user._id,
                food: foodId
            })

            await foodItemModel.findByIdAndUpdate(foodId, {
                $inc: { likeCount: -1 }
            })

            return res.status(200).json({
                message: "Food Unliked Successfully"
            })
        }

        const like = await likeModel.create({
            user: user._id,
            food: foodId
        })

        await foodItemModel.findByIdAndUpdate(foodId, {
            $inc: { likeCount: 1 }
        })

        return res.status(200).json({
            message: "Food Liked Successfully",
            like
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Internal server error', error: error.message });
    }
}

async function saveFood(req, res) {
    try {
        const { foodId } = req.body;
        const user = req.user;

        const isAlreadySaved = await saveModel.findOne({
            user: user._id,
            food: foodId
        })

        if (isAlreadySaved) {
            await saveModel.deleteOne({
                user: user._id,
                food: foodId
            })

            return res.status(200).json({
                message: "Food Unsaved Successfully"
            })
        }

        const save = await saveModel.create({
            user: user._id,
            food: foodId
        })

        return res.status(200).json({
            message: "Food Saved Successfully",
            save
        })
    }
    catch (error) {
        console.error(error);
        res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

module.exports = {
    createFood,
    getFoodItems,
    likedFood,
    saveFood
}