const express = require('express');
const router = express.Router();
const authMiddleware = require('../middlewares/auth.middleware');
const foodController = require('../controllers/food.controller');
const multer = require('multer');

const upload = multer({
    storage: multer.memoryStorage()
})

router.post('/', authMiddleware.foodPartnerAuthMiddleware, upload.single('video'), foodController.createFood);

router.get('/', authMiddleware.userAuthMiddleware, foodController.getFoodItems);

module.exports = router;