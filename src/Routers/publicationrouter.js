const express = require('express');
const publicationcontroller = require('../Controllers/publicationController');
const router = express.Router();

router.post('/createpublication', publicationcontroller.createPublication);
router.get('/listpublication', publicationcontroller.listPublication);
router.get('/getpublication/:publicationId', publicationcontroller.getPublication);
router.put('/updatepublication/:publicationId', publicationcontroller.updatePublication);
router.put('/disablepublication/:publicationId', publicationcontroller.disablePublication);
router.put('/enablepublication/:publicationId', publicationcontroller.enablePublication);

module.exports = router;