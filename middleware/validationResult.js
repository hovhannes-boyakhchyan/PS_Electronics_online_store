const { validationResult } = require('express-validator');
const AppError = require('../managers/appError');

module.exports = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.onError(new AppError('validation error', 400), { errors: errors.array() });
    }
    next();
}