
const express = require('express');
const AuthController = require('./auth.controller');
const router = express.Router();
const AuthRoutes = router;

router.post(
    '/register',
    AuthController.signUp
);

router.post(
    '/login',
    AuthController.signIn
);


module.exports = AuthRoutes;