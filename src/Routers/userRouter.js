const express = require('express');

const userController = require('../Controllers/userControllers');
const router = express.Router();

router.post('/createuser', userController.createUser);
router.get('/listuser', userController.listUser);
router.put('/updateuser/:userId', userController.updateUser);
router.put('/disableuser/:userId', userController.disableUser);
router.put('/enableuser/:userId', userController.enableUser);


module.exports = router;