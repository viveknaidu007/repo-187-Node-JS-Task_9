// routes/todos.js
const express = require('express');
const router = express.Router();
const Todo = require('../models/todo');

// 1. POST /todos - Create a New To-Do
router.post('/', async (req, res) => {
  const { title, description } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const newTodo = new Todo({
      title,
      description,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 2. GET /todos - Retrieve All To-Dos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 3. GET /todos/:id - Retrieve a To-Do by ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const todo = await Todo.findById(id);
    if (!todo) {
      return res.status(404).json({ error: 'To-do not found' });
    }
    res.status(200).json(todo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 4. PUT /todos/:id - Update a To-Do by ID
router.put('/:id', async (req, res) => {
  const { id } = req.params;
  const { title, description, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: 'Title is required' });
  }

  try {
    const updatedTodo = await Todo.findByIdAndUpdate(id, {
      title,
      description,
      completed,
    }, { new: true });

    if (!updatedTodo) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    res.status(200).json(updatedTodo);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// 5. DELETE /todos/:id - Delete a To-Do by ID
router.delete('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const deletedTodo = await Todo.findByIdAndDelete(id);
    if (!deletedTodo) {
      return res.status(404).json({ error: 'To-do not found' });
    }

    res.status(200).json({ message: 'To-do item deleted successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

module.exports = router;
