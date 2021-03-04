const getdb = require('../../util/database').getdb;
const mongodb = require('mongodb');

class Restaurant {
    constructor(data) {
        this.image = data.image;
        this.name = data.name;
        this.rating = data.rating;
        this.votes = data.votes;
        this.review = data.review;
        this.foodType = data.foodType;
        this.estimatedCost = data.estimatedCost;
        this.minOrderAmount = data.minOrderAmount;
        this.deliveryTimeEstimate = data.deliveryTimeEstimate;
        this.modeOfPaymentAccepted = data.modeOfPaymentAccepted;
    }
    static fetchRestaurantList() {
        const db = getdb();
        return db.collection('restaurants').find().toArray().
            then(restaurant => {
                return restaurant;
            })
            .catch(err => {
                console.log("Restaurant Not found" + err);
            });
    }
    saveRestaurant() {
        const db = getdb();
        return db.collection('restaurants').insertOne(this)
                .then(result => {
                    console.log(result);
                    return result})
                .catch(err => {
                    console.log("Restaurant insertion is not successful" + err);
                });
    }
}

module.exports = Restaurant;