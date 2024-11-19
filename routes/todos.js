const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// Create a new to-do
router.post('/', async (req, res) => {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: 'Title is required' });

    const todo = new Todo({
        title,
        description
    });
    await todo.save();
    res.status(201).json(todo);
});

// Retrieve all to-dos
router.get('/', async (req, res) => {
    const todos = await Todo.find();
    res.json(todos);
});

// Retrieve a specific to-do by ID
router.get('/:id', async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Update a specific to-do by ID
router.put('/:id', async (req, res) => {
    const { title, description, completed } = req.body;
    const todo = await Todo.findByIdAndUpdate(req.params.id, { title, description, completed }, { new: true });
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json(todo);
});

// Delete a specific to-do by ID
router.delete('/:id', async (req, res) => {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    res.json({ message: 'To-do item deleted successfully' });
});

module.exports = router;