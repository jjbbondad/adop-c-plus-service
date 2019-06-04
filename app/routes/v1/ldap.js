const router = require('express').Router();

const {
    addUser,
    removeUser,
    search,
} = require('../../controllers/ldap');

router.get('/add/:id/:id2/:id3', addUser);
router.get('/remove/:id/', removeUser);
router.get('/search/:id/', search);

module.exports = router;
