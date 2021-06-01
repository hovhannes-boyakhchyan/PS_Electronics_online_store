const TokenManager = require('../managers/tokenManager');
const AppError = require('../managers/appError');


module.exports = (req, res, next) => {
    const token = req.headers['token'] || req.body['token'] || req.query['token'];
    if (token) {
        try {
            const decode = TokenManager.decode(req.body.token);
            if (decode.userId && decode.action === 'login') {
                req.decode = decode;
                next();
            } else {
                throw new AppError('Invalid Token', 401);
            }
        } catch (e) {
            throw new AppError('Invalid Token', 401);
        }
    } else {
        throw new AppError('Invalid Token', 401);
    }
}