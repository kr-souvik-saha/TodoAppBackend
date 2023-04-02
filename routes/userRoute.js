const express = require("express");
const res = require("express/lib/response");
const {
    register,
    login,
    current
} = require("../controllers/userController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post('/register', register);

router.post('/login', login);

router.get('/current', validateToken, current);

module.exports = router;