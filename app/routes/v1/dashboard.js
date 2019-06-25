const router = require('express').Router();

const {
   getData,
   saveUser,
   listUser,
   readData,
   readLdapUserData,
} = require('../../controllers/dashboard');

router.get('/getData', getData);
router.get('/saveUser', saveUser);
router.get('/listUser', listUser);
router.get('/readData', readData);
router.get('/readLdapUserData', readLdapUserData);
module.exports = router;
