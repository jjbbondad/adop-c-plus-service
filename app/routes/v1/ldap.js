const router = require('express').Router();

const {
    addUser,
    removeUser,
    search,
	searchAllUsers,
    modify,
} = require('../../controllers/ldap');

router.get('/add/:id/:password', addUser);
router.get('/remove/:id/', removeUser);
router.get('/search/:class/:cn/', search);
router.get('/searchAllUsers', searchAllUsers);
router.get('/modify/:id/:group/:ops/', modify);

module.exports = router;
