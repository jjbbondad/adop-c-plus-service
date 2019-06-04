const router = require('express').Router();

const {
    addUser,
    RemoveUser,
    Search,
} = require('../../controllers/ldap');

router.get('/add/:id/', addUser);
router.get('/remove/:id/', RemoveUser);
router.get('/stop/:id/', Search);

module.exports = router;
