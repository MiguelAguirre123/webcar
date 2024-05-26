const express = require('express');

const userController = require('../Controllers/userControllers');
const router = express.Router();

router.post('/createuser', userController.createUser);
router.post('/login', userController.login)
router.get('/listusers', userController.listUsers);
router.put('/updateuser/:userId', userController.updateUser);
router.put('/disableuser/:userId', userController.disableUser);
router.put('/enableuser/:userId', userController.enableUser);
router.get('/getuser/:userId', userController.getUser);


module.exports = router;