const User = require('../models/user');
const Bcrypt = require('../managers/bcrypt');
const AppError = require('../managers/appError');

class UserCtrl {
    async add(data) {
        if (await User.exists({ email: data.email })) {
            throw new AppError('User with such email is already registered', 401);
        }
        return new User({
            name: data.name,
            suranme: data.surname,
            email: data.email,
            password: await Bcrypt.hash(data.password)
        }).save();
    }
    async getRegisteredUser(email) {
        if (! await User.exists({ email: email })) {
            throw new AppError('Login or Password is invalid', 404);
        }
        return User.findOne({ email: email });
    }
    async getOne(email) {
        if (! await User.exists({ email: email })) {
            throw new AppError('User with this email is not registered.', 404);
        }
        return User.findOne({ email: email });
    }
    async getById(id) {
        if (! await User.exists({ _id: id })) {
            throw new AppError('User with this email is not registered.', 404);
        }
        return User.findById(id);
    }
}


module.exports = new UserCtrl;