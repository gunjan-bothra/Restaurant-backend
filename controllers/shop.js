const Product = require('../models/product');
const path = require('path');

exports.addproducts = (req, res, next) => {
    console.log(req.body);
}
exports.getProducts = (req,res,next) => {
    Product.fetchAll().then(products => {
        console.log(products);
        // res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); // sendFile expects absolute path
        res.send(products);
    })
    .catch(err => {
        console.log(err);
    });
}

exports.getProduct = (req, res, next) => {
    const prodId = req.params.productId;
    Product.fetchById(prodId).then(product => {
        console.log(product);
        // return product;
        res.send(product);
    })
    .catch(err => {
        console.log(err);
    })
}