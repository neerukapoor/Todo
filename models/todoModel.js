const mongoose = require('mongoose');

const todoSchema = new mongoose.Schema({
    userId: String,
    userName: String,
    emailId: String,
    todos: [String],
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

// const completedSchema = new mongoose.Schema({
//     userId: String,
//     completedTodos: [String]
// })

const Todo = mongoose.model('Todo', todoSchema)
// const CompletedTodos = mongoose.model('Completed', completedSchema)  


// module.exports = mongoose.model('Todo', todoSchema);
module.exports = {Todo};