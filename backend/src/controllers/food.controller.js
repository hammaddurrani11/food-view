const foodItemModel = require('../models/food.model');
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

module.exports = {
    createFood,
    getFoodItems
}