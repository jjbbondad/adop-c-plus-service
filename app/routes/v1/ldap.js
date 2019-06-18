const router = require('express').Router();

const {
    addUser,
    removeUser,
    search,
    searchAllUsers,
    modify,
    changepassword,
} = require('../../controllers/ldap');

router.get('/add/:id/:password', addUser);
router.get('/remove/:id/', removeUser);
router.get('/search/:class/:cn/', search);
router.get('/searchAllUsers', searchAllUsers);
router.get('/modify/:id/:group/:ops/', modify);
router.get('/changepass/:id/:password/:opassword/', changepassword);

module.exports = router;
