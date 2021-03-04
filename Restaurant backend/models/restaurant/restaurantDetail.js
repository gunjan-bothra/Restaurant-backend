const getdb = require('../../util/database').getdb;
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

class restaurantDetail {
    constructor(restaurantID, dishes) {
        this.restaurantID = restaurantID;
        this.dishes = dishes;
    }

    static fetchRestaurantDetails(resId) {
        const db = getdb();
        return db.collection('restaurantDetail').find({restaurantID : resId}).toArray().
            then(restaurantDetail => {
                
                return db.collection('restaurants').find({_id : new ObjectId(resId)}).toArray().
                    then(restaurant => {
                        const detail = {
                            restaurantID:  resId,
                            name: restaurant[0].name,
                            address: restaurant[0].address,
                            estimatedCost: restaurant[0].estimatedCost,
                            rating: restaurant[0].rating,
                            deliveryTimeEstimate: restaurant[0].deliveryTimeEstimate,
                            minOrderAmount: restaurant[0].minOrderAmount,
                            modeOfPaymentAccepted: restaurant[0].modeOfPaymentAccepted,
                            dishes : restaurantDetail[0].dishes
                        };
                        console.log(detail);
                        return detail;

                    }).catch(err => {
                        console.log("Restaurant fetch failed" + err);
                    });
            })
            .catch(err => {
                console.log("Restaurant Not found" + err);
            });
    }

    saveRestaurantDetails() {
        const db = getdb();
        return db.collection('restaurantDetail').insertOne(this)
                .then(result => {
                    console.log(result);
                    return result})
                .catch(err => {
                    console.log("Restaurant Detail insertion is not successful" + err);
                });
    }
}

module.exports = restaurantDetail;