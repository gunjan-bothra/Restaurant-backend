 const Restaurant = require('../models/restaurant/restaurant'); 
 const RestaurantDetail = require('../models/restaurant/restaurantDetail'); 
 const Cart = require('../models/restaurant/user');
 
 exports.getRestaurantList = (req,res,next) => {
    Restaurant.fetchRestaurantList().then(restaurantList =>{
        res.send(restaurantList);
    })
 };

 exports.addRestaurant = (req, res, next) => {
     console.log("Reached Here");
    const restaurantData = {
        image : req.body.image,
        name : req.body.name,
        rating : req.body.rating,
        votes : req.body.votes,
        review : req.body.review,
        foodType : req.body.foodType,
        estimatedCost : req.body.estimatedCost,
        minOrderAmount : req.body.minOrderAmount,
        deliveryTimeEstimate : req.body.deliveryTimeEstimate,
        modeOfPaymentAccepted : req.body.modeOfPaymentAccepted
    };
    const restaurant = new Restaurant(restaurantData);

    restaurant.saveRestaurant()
    .then(result => {
        res.send(result);
    })
    .catch(err=> console.log("Restaurant has not been added" + err));
 }


 // Get and save restaurant detail functionality
 exports.saveRestaurantDetails = (req, res, next) => {
     req.body = {
        "restaurantID": "5dbb0e903a02fc8f5c8fc253",
        "dishes": [
            {
                "dishName": "Burger",
                "price": "160",
                "description": "Its a very delicious burger which contains cheese and vegetables",
                "votes": "4",
                "image": "Tag1",
                "dishId": Math.random() 
            },
            {
                "dishName": "Pizza",
                "price": "160",
                "description": "Its a very delicious burger which contains cheese and vegetables",
                "votes": "4",
                "image": "Tag1",
                "dishId": Math.random() 
            }
        ]
     }
    
    const restaurantID = req.body["restaurantID"];
    const dishes = req.body["dishes"];
    const restaurantDetail = new RestaurantDetail(restaurantID, dishes);
    restaurantDetail.saveRestaurantDetails()
    .then(detail => {
        console.log(detail);
        res.send(detail);
    })
    .catch(err => {
        console.log("Details are not saved" + err);
    });
 }

 exports.fetchRestaurantDetails = (req, res, next) => {
    RestaurantDetail.fetchRestaurantDetails('5dbb0e903a02fc8f5c8fc253')
    .then(detail => {
        res.send(detail);
    })
    .catch(err => {
        console.log("Restaurant Detail fetch failed" + err);
    });
 }


 //Add to cart and get cart item functionality
 exports.addToCart = (req, res, next) => {
    const cart = new Cart(req.user[0]._id, req.user[0].name, req.user[0].email, req.user[0].cart);
    cart.addToCart(req.params.itemId)
    .then(cartItem => {
        res.send(cartItem);
    })
    .catch(err => {
        console.log("Item doesn't added to the cart" + err);
    });
 }

 exports.fetchDisplayItems = (req, res, next) => {
     console.log("Reached here");
    Cart.fetchDisplayItems()
    .then(cartDetail => {
        res.send(cartDetail);
    })
    .catch(err => {
        console.log("Restaurant Detail fetch failed" + err);
    }); 
 }