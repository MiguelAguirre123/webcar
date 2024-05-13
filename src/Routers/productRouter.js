const express = require('express');
const productController = require ('../Controllers/productController');
const router = express.Router();

router.post('/createproduct',productController.createProduct);
router.get('/listproduct/:customerId', productController.listProduct);
router.get('/getproduct/:productId', productController.getProduct);
router.put('/updateproduct/:productId', productController.updateProduct);
router.put('/disableproduct/:productId', productController.disableProduct);
router.put('/enableproduct/:productId', productController.enableProduct);

module.exports=router;