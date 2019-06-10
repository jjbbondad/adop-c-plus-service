const router = require('express').Router();

const {
    containerStart,
    containerStop,
    containerStatus,
    composeUpAll,
} = require('../../controllers/docker');

router.get('/start/:id/', containerStart);
router.get('/stop/:id/', containerStop);
router.get('/status/:id/', containerStatus);
router.get('/compose/upAll', composeUpAll);

module.exports = router;
