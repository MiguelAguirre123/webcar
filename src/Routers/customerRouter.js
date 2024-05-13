const express = require('express');

const customerController = require('../Controllers/customerController');
const router = express.Router();

router.post('/createCustomer', customerController.createCustomer);
router.get('/listCustomer', customerController.listCustomer);
router.put('/updateCustomer/:customerId', customerController.updateCustomer);
router.put('/disableCustomer/:customerId', customerController.disableCustomer);
router.put('/enableCustomer/:customerId', customerController.enableCustomer);
router.get('/getcustomer/:customerId', customerController.getCustomer);

module.exports = router;