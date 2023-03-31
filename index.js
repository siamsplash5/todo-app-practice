/* eslint-disable no-unused-vars */
// dependencies
const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const userHandler = require('./routeHandler/userHandler');
const todoHandler = require('./routeHandler/todoHandler');

// database connection to with mongoose
mongoose
    .connect('mongodb://0.0.0.0/todos')
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

// express app initialization
const app = express();

// configuration
dotenv.config();
app.use(express.json());

// application routes
app.use('/todo', todoHandler);
app.use('/user', userHandler);

// default error handler
const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }
    res.status(500).json({ error: err });
};

app.use(errorHandler);

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
