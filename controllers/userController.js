const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const register = asyncHandler(async (req, res) => {
    const {
        username,
        email,
        password
    } = req.body;
    if (!username || !email || !password) {
        res.status(400);
        throw new Error("All fields are required");
    };

    const userAvailable = await User.findOne({
        email
    });

    if (userAvailable) {
        res.status(400);
        throw new Error("User already exist");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        username,
        email,
        password: hashedPassword
    });

    if (user) {
        res.status(201).json({
            _id: user.id,
            email: user.email
        });
    } else {
        res.status(400);
        throw new Error("User data is invalid");
    }
});

const login = asyncHandler(async (req, res) => {
    const {
        email,
        password
    } = req.body;
    if (!email || !password) {
        res.status(400);
        throw new Error("Enter both email and password");
    }

    const user = await User.findOne({
        email
    });

    if (user && (await bcrypt.compare(password, user.password))) {
        const accessToken = jwt.sign({
            user: {
                username: user.username,
                email: user.email,
                id: user.id
            },
        }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: "15m"
        });
        res.status(200).json({
            accessToken: accessToken
        })
    } else {
        res.status(401);
        throw new Error("Email or password is not valid")
    };
});

const current = asyncHandler(async (req, res) => {
    res.status(200).json(req.user)
});

module.exports = {
    register,
    login,
    current
}