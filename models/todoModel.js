const mongoose = require("mongoose");

const todoSchema = mongoose.Schema({
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: "User",
    },
    subject: {
        type: String,
        required: [true, "Please add the todo subject"],
    },
    description: {
        type: String,
        required: [true, "Please add the todo description"],
    },
    status: {
        type: String,
        required: [true, "Please add the todo status"],
    },

}, {
    timestamps: true,
});

module.exports = mongoose.model("Todo", todoSchema);