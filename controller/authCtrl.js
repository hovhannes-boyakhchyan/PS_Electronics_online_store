const UserCtrl = require('./userCtrl');
const TokenManager = require('../managers/TokenManager');
const mailer = require('../managers/mailer');
const registerConfigs = require('../configs/registerConfig');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/appError');


class AuthCtrl {
    async register(data) {
        const userAdd = await UserCtrl.add(data);
        if (userAdd) {
            const token = TokenManager.encode({
                userId: userAdd['_id'],
                action: 'register'
            }, '365d');
            return await mailer(userAdd.email, registerConfigs.subject, registerConfigs.html(token));
        }
    }
    async login(data) {
        const { email, password } = data;
        const user = await UserCtrl.getRegisteredUser(email);
        if (user && await Bcrypt.compare(password, user.password)) {
            if (user.verify) {
                return TokenManager.encode({
                    userId: user['_id'],
                    action: 'login'
                });
            }
            throw new AppError('A letter has been sent to your mail, please confirm your registration.', 401);
        }
        throw new AppError('Login or Password is invalid', 401);
    }
    async activate(token) {
        const decode = TokenManager.decode(token);
        if (decode.userId && decode.action === 'register') {
            const user = await UserCtrl.getById(decode.userId);
            if (user) {
                if (user.verify) {
                    throw new AppError('Profil is active', 404);
                }
                user.verify = true;
                return user.save();
            }
        }
        throw new AppError('This activation link is invalid.', 401);
    }
    async forgotPass(email) {
        const user = await UserCtrl.getOne(email);
        if (user) {
            const token = TokenManager.encode({
                userId: user['_id'],
                action: 'forgotPass'
            });
            user.forgotPass = token;
            await user.save();
            return await mailer(email, 'Change Password', `<a href=http://127.0.0.1:5500/newPass.html?token=${token}>Change Password.</a>`);
        }
    }
    async newPass(data) {
        const { token, password } = data;
        const decode = TokenManager.decode(token);
        if (decode.userId && decode.action === 'forgotPass') {
            const user = await UserCtrl.getById(decode.userId);
            if (user) {
                if (user.forgotPass === token) {
                    user.password = await Bcrypt.hash(password);
                    user.forgotPass = undefined;
                    return user.save();
                }
            }
        }
        throw new AppError('This link is invalid.', 401);
    }


}


module.exports = new AuthCtrl;