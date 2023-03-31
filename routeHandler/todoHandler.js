/* eslint-disable new-cap */
/* eslint-disable no-unused-vars */

// dependencies
const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const checkLogin = require('../middlewares/checkLogin');

const Todo = new mongoose.model('Todo', todoSchema);

// module scaffolding
const router = express.Router();

// GET ALL THE TODO
router.get('/', checkLogin, async (req, res) => {
    try {
        const data = await Todo.find().select({ _id: 0, __v: 0, status: 0 });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error.' });
    }
});

// GET A TODO BY ID
router.get('/:id', checkLogin, async (req, res) => {
    try {
        const data = await Todo.find({ _id: req.params.id });
        res.status(200).json(data);
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error' });
    }
});

// POST TODO
router.post('/', checkLogin, async (req, res) => {
    const newTodo = new Todo(req.body);
    try {
        await newTodo.save();
        res.status(200).json({ message: 'Your todo has inserted succesfully.' });
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error' });
    }
});

// POST MULTIPLE TODO
router.post('/all', checkLogin, async (req, res) => {
    try {
        await Todo.insertMany(req.body);
        res.status(200).json({ message: 'Your todos has inserted succesfully.' });
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error' });
    }
});

// PUT TODO
router.put('/:id', checkLogin, async (req, res) => {
    try {
        await Todo.updateOne({ _id: req.params.id }, { $set: { status: 'inactive' } });
        res.status(200).json({ message: 'Your todo has updated succesfully.' });
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error.' });
    }
});

// DELETE TODO
router.delete('/:id', checkLogin, async (req, res) => {
    try {
        await Todo.deleteOne({ _id: req.params.id });
        res.status(200).json({ message: 'Your todo has deleted succesfully.' });
    } catch (error) {
        res.status(500).json({ error: 'There is a server side error.' });
    }
});

module.exports = router;
