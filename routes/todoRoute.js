const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todoModel');

router.get("/", async (req,res)=>{
    try {
        const userId = req.query.id;
        const todosByUserId = await Todo.findOne({userId});
        // const completedTodosByUserId = await CompletedTodos.findOne({userId});
        console.log("todos user id:  "+todosByUserId);
            res.render('todo', {todosByUserId});
    }
    catch (e) {
        console.error(e)
    }
})

router.post("/", async (req,res) => {
    const id = req.query.id;
    const todo = req.body.todo;
    const result = await Todo.findOne({userId: id});
    result.todos.push(todo);
    result.save();
    res.redirect(`/todo?id=${id}`);
})

router.post("/complete/:id", async (req,res) => {
    const userId = req.params.id;
    const completedTodo = req.body.todo;
    console.log(completedTodo);
    console.log(userId)
    const todosByUserId = await Todo.findOne({userId});

    const toRemoveFromTodosList = todosByUserId.todos.indexOf(completedTodo);
    console.log(toRemoveFromTodosList);
    todosByUserId.todos.splice(toRemoveFromTodosList, 1);

    todosByUserId.completedTodoList.push(completedTodo);
    todosByUserId.save();
    res.json({ success: true });
})

router.get("/completedList", async (req,res) => { 
    res.send("yoi");
})


module.exports = router;