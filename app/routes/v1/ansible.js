const router = require('express').Router();

const {
    ansibleStart
} = require('../../controllers/ansible');

router.get('/start', ansibleStart);

module.exports = router;
