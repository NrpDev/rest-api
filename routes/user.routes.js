const express = require('express');

const router = express.Router();

const userController = require('../controllers/user.controller');
const authJwt = require('../middleware/authJwt');
const verifySignup = require('../middleware/verifySignup');
 
router.post('/', [
    authJwt.verifyToken,
    authJwt.isAdmin,
    verifySignup.checkRolesExisted
], userController.createUser)

module.exports = router;