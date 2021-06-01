const express = require('express');
const http = require('http');
const mongoose = require('mongoose');
const routers = require('./routers.js')

const app = express();
const server = http.createServer(app);
const PORT = 3000;


app.use(express.json());
app.use(express.urlencoded({ extended: false }));
routers(app);

mongoose.connect('mongodb://localhost/online-store', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true
}).then(() => {
    server.listen(PORT);
});
