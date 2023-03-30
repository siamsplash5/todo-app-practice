/* eslint-disable no-unused-vars */
// dependencies
const express = require('express');
const mongoose = require('mongoose');

// database connection to with mongoose
mongoose
    .connect('mongodb://0.0.0.0/todos')
    .then(() => console.log('connection successful'))
    .catch((err) => console.log(err));

// express app initialization
const app = express();
app.use(express.json());

// application routes
// default error handler

const errorHandler = (err, req, res, next) => {
    if (res.headersSent) {
        next(err);
    }
    res.status(500).json({ error: err });
};

app.listen(3000, () => {
    console.log('Listening to port 3000');
});
