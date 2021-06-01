const jwt = require('jsonwebtoken');
const { privateKey } = require('../configs/jwtPrivateKey');

class TokenManager {
    encode(data, duration = 60 * 60 * 12) {
        return jwt.sign(data, privateKey, { expiresIn: duration });
    }
    decode(token) {
        return jwt.verify(token, privateKey);
    }
}

module.exports = new TokenManager;