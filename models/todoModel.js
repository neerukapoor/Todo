const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    emailId: String,
    todos: [{
        todoItem: String,
        todoNotes: String
    }],
    createdAt: {
        type: Date,
        immutable: true,
        default: () => Date.now()
    },
    updatedAt: {
        type: Date,
        default: () => Date.now()
    },
    completedTodoList: [String]
})

const Todo = mongoose.model('Todo', todoSchema)

module.exports = {Todo};