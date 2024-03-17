const express = require('express');
const publicationcontroller = require('../Controllers/publicationcontroller');
const router = express.Router();

router.post('/createpublication', publicationcontroller.createPublication);
router.get('/listpublication', publicationcontroller.listPublication);
router.put('/updatepublication/:publicationId', publicationcontroller.updatePublication);
router.put('/disablepublication/:publicationId', publicationcontroller.disablePublication);
router.put('/enablepublication/:publicationId', publicationcontroller.enablePublication);

module.exports = router;