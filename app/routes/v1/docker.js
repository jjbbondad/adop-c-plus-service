const router = require('express').Router();

const {
    containerStart,
    containerStop,
    containerStatus
	composeUp
} = require('../../controllers/docker');

router.get('/start/:id/', containerStart);
router.get('/stop/:id/', containerStop);
router.get('/status/:id/', containerStatus);
router.get('/compose/up', composeUp);

module.exports = router;
