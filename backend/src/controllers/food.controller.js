const foodItemModel = require('../models/food.model');
const storageService = require('../services/storage.service');
const { v4: uuid } = require('uuid');

async function createFood(req, res) {
    try {
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
    }

}

module.exports = {
    createFood
}