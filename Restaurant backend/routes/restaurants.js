const express = require('express');
const router = express.Router();

const restaurantController = require('../controllers/restaurants')

router.get('/list', restaurantController.getRestaurantList);

router.post('/addRestaurant', restaurantController.addRestaurant);

router.get('/restaurantDetail', restaurantController.fetchRestaurantDetails);
router.post('/restaurantDetail', restaurantController.saveRestaurantDetails);

router.post('/addCart/:itemId', restaurantController.addToCart);

router.get('/fetchDisplayItems', restaurantController.fetchDisplayItems);
module.exports = router;