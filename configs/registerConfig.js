module.exports = {
    subject: 'Please confirm registration.',
    html(token) {
        return `<a href=http://127.0.0.1:5500/activait.html?token=${token}>Follow the link to confirm your registration.</a>`
    }
}