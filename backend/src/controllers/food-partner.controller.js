const foodPartnerModel = require('../models/foodpartner.model');
const foodItemModel = require('../models/food.model');

async function getFoodPartnerById(req, res) {
    const foodPartnerId = req.params.id;

    const foodPartner = await foodPartnerModel.findById(foodPartnerId);
    const foodItemByFoodPartner = await foodItemModel.find({ foodPartner: foodPartnerId });

    if (!foodPartner) {
        return res.status(404).json({ message: 'Food partner not found' });
    }

    return res.status(200).json({
        message: "Food Partner Retrieved Successfully",
        foodPartner,
        foodItems: foodItemByFoodPartner
    });
}

module.exports = {
    getFoodPartnerById
}