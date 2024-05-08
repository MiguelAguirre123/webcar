const express = require('express');
const communityController = require('../Controllers/communityController');
const router = express.Router();

router.post('/createCommunity', communityController.createCommunity);
router.get('/listCommunity',communityController.listCommunity);
router.put('/updateCommunity/:communityId',communityController.updateCommunity);
router.put('/disableCommunity/:communityId', communityController.disableCommunity);
router.put('/enableCommunity/:communityId', communityController.enableCommunity);
router.put('/getCommunity/:communityId',communityController.getCommunity);
module.exports = router;