const express = require('express');

const userCommunityController = require('../Controllers/userCommunityController');
const router = express.Router();

router.post('/createusercommunity', userCommunityController.createUserCommunity);
router.get('/listusercommunity', userCommunityController.listUserCommunity);
router.put('/disableusercommunity/:userCommunityId', userCommunityController.disableUserCommunity);
router.put('/enableusercommunity/:userCommunityId', userCommunityController.enableUserCommunity);


module.exports = router;