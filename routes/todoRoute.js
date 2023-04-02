const express = require('express');
const {
    getTodo,
    getTodos,
    createTodo,
    updateTodo,
    deleteTodo
} = require('../controllers/todoController');
const validateToken = require('../middleware/validateTokenHandler');

const router = express.Router();

router.use(validateToken);

router.get('/', getTodos);

router.get('/:id', getTodo);

router.post('/', createTodo);

router.put('/:id', updateTodo);

router.delete('/:id', deleteTodo);

module.exports = router