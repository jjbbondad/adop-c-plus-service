const router = require('express').Router();

const {
    addUser,
    removeUser,
    search,
    modify,
} = require('../../controllers/ldap');

router.get('/add/:id/:password', addUser);
router.get('/remove/:id/', removeUser);
router.get('/search/:id/', search);
router.get('/modify/:id/:group/:ops/', modify);

module.exports = router;
