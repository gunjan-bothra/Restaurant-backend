const path = require('path');
const Product = require('../models/product');
const mongodb = require('mongodb');
const ObjectId = mongodb.ObjectId;

exports.getAddProduct = (req, res, next) => {
        // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');
        res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
    };

exports.postAddProduct = (req,res,next) => {
    console.log(req);
    const title = req.body.title;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.imgUrl;
    const product = new Product(title, price, description, imageUrl);
    product.save().then(result => {
        console.log("product Created");
        res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
    
}

exports.updateProduct = (req,res,next) => {
    console.log(req.body);
    // const id = req.params.productId;
    // const title = req.body.title;
    // const price = req.body.price;
    // const description = req.body.description;
    // const imageUrl = req.body.imgUrl;
    const id = "5db939b3b688465aa077caab";
    const title = "test_update";
    const price = "24";
    const description = "Test update operation";
    const imageUrl = "http://image.png";
    const product = new Product(title, price, description, imageUrl, new ObjectId(id));
    product.save().then(result => {
        console.log("product Updated" + result);
        res.send(result);
        // res.redirect('/');
    }).catch(err => {
        console.log(err);
    })
    
}

exports.insertMany = (req, res, next) => {
    console.log("reached here");
    Product.insertMany().then(result => {
        console.log(result);
    })
}

exports.tagsSize = (req, res, next) => {
    Product.tagSize().then(result => {
        console.log(result);
        res.send(result);
    })
}

