const express = require('express');
const responseHandler = require('../middleware/responseHandler');
const { body } = require('express-validator');
const validateToken = require('../middleware/validateToken');
const validationResult = require('../middleware/validationResult');
const AuthCtrl = require('../controller/authCtrl');
const UserCtrl = require('../controller/userCtrl');

const router = express.Router();

router.post(
    '/register',
    body('name').exists().isLength({ min: 1 }),
    body('surname').exists().isLength({ min: 1 }),
    body('email').isEmail(),
    body('password').exists().isLength({ min: 6 }),
    responseHandler,
    validationResult,
    async (req, res) => {
        try {
            const registerRes = await AuthCtrl.register(req.body);
            res.onSuccess(registerRes);
        } catch (e) {
            res.onError(e);
        }
    }
)
router.post(
    '/login',
    body('email').isEmail(),
    body('password').exists().isLength({ min: 6 }),
    responseHandler,
    validationResult,
    async (req, res) => {
        try {
            const loginToken = await AuthCtrl.login(req.body);
            res.onSuccess(loginToken, 'login');
        } catch (e) {
            res.onError(e);
        }
    }
)
router.post(
    '/activate',
    body('token').exists(),
    responseHandler,
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.activate(req.body.token);
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
)
router.post(
    '/forgot-password',
    body('email').isEmail(),
    responseHandler,
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.forgotPass(req.body.email);
            res.onSuccess();
        } catch (e) {
            res.onError(e);
        }
    }
)
router.post(
    '/new-password',
    body('token').exists(),
    body('password').exists().isLength({ min: 6 }),
    responseHandler,
    validationResult,
    async (req, res) => {
        try {
            await AuthCtrl.newPass(req.body);
            res.onSuccess({}, 'Password changed.');
        } catch (e) {
            res.onError(e);
        }
    }
)
router.post(
    '/init-session',
    responseHandler,
    validateToken,
    async (req, res) => {
        try {
            const user = await UserCtrl.getById(req.decode.userId);
            res.onSuccess(user, 'init-session');
        } catch (e) {
            res.onError(e);
        }
    }
)



module.exports = router;