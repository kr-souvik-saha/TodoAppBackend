const asyncHandler = require('express-async-handler');
const Todo = require("../models/todoModel");

const getTodos = asyncHandler(async (req, res) => {
    const todo = await Todo.find({
        user_id: req.user.id
    })
    res.status(200).json(todo);
});

const getTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id)

    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    res.status(200).json(todo);
});

const createTodo = asyncHandler(async (req, res) => {
    const {
        subject,
        description,
        status
    } = req.body;
    if (!subject || !description || !status) {
        res.status(400);
        throw new Error("All fields are mendotory");
    }

    const todo = await Todo.create({
        subject,
        description,
        status,
        user_id: req.user.id
    })

    res.status(201).json(todo);
});

const updateTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }
    if (todo.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorised request");
    }

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, {
        new: true
    });
    res.status(200).json(updatedTodo);
});

const deleteTodo = asyncHandler(async (req, res) => {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
        res.status(404);
        throw new Error("Todo not found");
    }

    if (todo.user_id.toString() !== req.user.id) {
        res.status(403);
        throw new Error("Unauthorised request");
    }

    await Todo.findByIdAndRemove(req.params.id);
    res.status(200).json({
        message: `Todo deleted for id: ${req.params.id}`
    });
});

module.exports = {
    getTodos,
    getTodo,
    createTodo,
    updateTodo,
    deleteTodo
};