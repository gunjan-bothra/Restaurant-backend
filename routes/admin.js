const path = require('path');
const express = require('express');
const router = express.Router();
// const Product = require('../models/product');
const adminController = require('../controllers/admin');

router.get('/products', adminController.getAddProduct);
// router.get('/products',(req, res, next) => {
//     // res.send('<form action="/admin/product" method="POST"><input type="text" name="title"><button type="submit">Submit</button></form>');
//     res.sendFile(path.join(__dirname, '../', 'views', 'add-product.html'));
// });
router.post('/products',adminController.postAddProduct);
// router.post('/products',(req, res, next) => {
//     console.log(req.body);
//     res.redirect('/');
// });
router.post('/products/insertMany', adminController.insertMany);
router.get('/products/tagsSize', adminController.tagsSize);

router.post('/products/:productId',adminController.updateProduct);



module.exports = router;