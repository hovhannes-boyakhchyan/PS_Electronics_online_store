const nodemailer = require('nodemailer');
const { service, username, password } = require('../configs/mailConfig');

const transporter = nodemailer.createTransport(
    {
        service: service,
        auth: {
            user: username,
            pass: password
        }
    }
);

module.exports = async (to, subject, html) => {
    return transporter.sendMail({
        from: username,
        to: to,
        subject: subject,
        text: '',
        html: html
    });
}