const express = require('express');
const carController = require('../Controllers/carControllers');
const router = express.Router();

router.post('/createcar', carController.createCar);
router.get('/listcar',carController.listCar);
router.put('/updatecar/:carId', carController.updateCar);
router.put('/disablecar/:carId', carController.disableCar);
router.put('/enablecar/:carId', carController.enableCar);

module.exports = router;