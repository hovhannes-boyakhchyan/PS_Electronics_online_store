module.exports = (app) => {
    app.use('/auth', require('./routers/auth'));
}