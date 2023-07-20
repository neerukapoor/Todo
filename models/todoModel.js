const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: String,
    todos: [String],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    }
})

module.exports = mongoose.model('Todo', todoSchema);