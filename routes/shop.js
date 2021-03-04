const express = require('express');
const router = express.Router();
const shopController = require('../controllers/shop');

// router.get('/',(req, res, next) => {
//     res.sendFile(path.join(__dirname, '../', 'views', 'shop.html')); // sendFile expects absolute path
//     // res.sendFile('../views/shop.html'); // this gives relative path wouldn't work with sendFile
// });
router.get('/products',shopController.getProducts);
router.post('/products',shopController.addproducts);
router.get('/products/:productId',shopController.getProduct);
module.exports = router;

