/* eslint-disable new-cap */
/* eslint-disable comma-dangle */
/* eslint-disable no-underscore-dangle */
// dependencies
const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

// module scaffolding
const router = express.Router();

// create a document in database
const User = new mongoose.model('User', userSchema);

// SIGN UP ROUTER
router.post('/signup', async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
            name: req.body.name,
            username: req.body.username,
            password: hashedPassword,
        });
        await newUser.save();
        res.status(200).json({ message: 'Your account has created succesfully' });
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error.' });
    }
});

// LOG IN ROUTER
router.post('/login', async (req, res) => {
    try {
        const user = await User.find({ username: req.body.username });
        if (user && user.length > 0) {
            const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
            if (isValidPassword) {
                const token = await jwt.sign(
                    {
                        username: user[0].username,
                        id: user[0]._id,
                    },
                    process.env.JWT_SECRET,
                    {
                        expiresIn: '1h',
                    }
                );
                res.status(200).json(token);
            } else {
                res.status(401).json({ error: 'Authentication failed!' });
            }
        } else {
            res.status(401).json({ error: 'Authentication failed!' });
        }
    } catch (error) {
        res.status(401).json({ error: 'Authentication failed!' });
    }
});

module.exports = router;
