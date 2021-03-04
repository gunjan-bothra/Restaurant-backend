const getdb = require('../util/database').getdb;
const mongodb = require('mongodb');

class Product {
    constructor(title, price, description, imgUrl, id) {
        this.title= title;
        this.price = price;
        this.description = description;
        this.imgUrl = imgUrl;
        this._id = id;
    }
    save() {
        const db = getdb();
        let dbOp;
        if(this._id) {
            console.log(this);
            dbOp = db.collection('products').updateOne({_id: new mongodb.ObjectId(this._id)}, { $set: this});
        } else {
            dbOp = db.collection('products').insertOne(this);
        }
        return dbOp.
                then(result => {
                    console.log("data updated:");
                    return result;
                }).
                catch(err => {
                    console.log(err);
                });
    }
    static fetchAll() {
        const db = getdb();
        return db.collection('products').find().toArray()
        .then(product => {
            return product;
        })
        .catch(err => {
            console.log(err);
        })
    }

    static fetchById(prodId) {
        const db = getdb();
        console.log(mongodb.ObjectId(prodId));
        return db.collection('products').find({_id : mongodb.ObjectId(prodId)}).next()
        .then(product => {
            console.log(`matched Product: ${product}`);
            return product;
        })
        .catch(err => {
            console.log(err);
        })
    }

    static insertMany() {
        const db = getdb();
        return db.collection("inventory").insertMany([
            { item: "journal", status: "A", size: { h: 14, w: 21, uom: "cm" }, instock: [ { warehouse: "A", qty: 5 } ] },
            { item: "notebook", status: "A",  size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "C", qty: 5 } ] },
            { item: "paper", status: "D", size: { h: 8.5, w: 11, uom: "in" }, instock: [ { warehouse: "A", qty: 60 } ] },
            { item: "planner", status: "D", size: { h: 22.85, w: 30, uom: "cm" }, instock: [ { warehouse: "A", qty: 40 } ] },
            { item: "postcard", status: "A", size: { h: 10, w: 15.25, uom: "cm" }, instock: [ { warehouse: "B", qty: 15 }, { warehouse: "C", qty: 35 } ] }          
         ]).then(result => {
             console.log("Insert many has been successful");
             return result;
         });
    }

    static tagSize() {
        const db = getdb();
        return db.collection('inventory').find(
            { status: "A" }, { status: 0, instock: 0 }).toArray()
        .then(result => {
            return result;
        })
        .catch(err => {
            console.log(err);
        })
    }
}
module.exports = Product;