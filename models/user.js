const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const User = new Schema({
    verify: { type: Boolean, default: false },
    name: String,
    surname: String,
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    avatar: String,
    forgotPass: String
}, { versionKey: false, timestamps: true });


module.exports = mongoose.model('Users', User);