const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todoModel');

router.get("/", async (req, res)=>{
    try {
        const userId = req.query.id;
        const todoByUserId = await Todo.findOne({userId});
        res.render('todo', {todoByUserId});
    }
    catch (e) {
        console.error(e)
    }
})

router.post("/", async (req,res) => {
    const id = req.query.id;
    const todo = req.body.todo;
    const result = await Todo.findOne({userId: id});
    result.todos.push({todoItem:todo,todoNotes:""});
    result.save();
    res.redirect(`/todo?id=${id}`);
})

router.post("/complete/:id", async (req, res) => {
    const userId = req.params.id;
    const completedTodo = req.body.todo;
    const todosByUserId = await Todo.findOne({userId});

    // const toRemoveFromTodosList = todosByUserId.todos.indexOf(completedTodo);
    const toRemoveFromTodosList = todosByUserId.todos.findIndex(
        (todo) => todo.todoItem === completedTodo
    );
    if(toRemoveFromTodosList !== -1) {
        todosByUserId.todos.splice(toRemoveFromTodosList, 1);
        todosByUserId.completedTodoList.push(completedTodo);
        todosByUserId.save();
    }
    else 
        console.log("Not able to find the todo to remove")
    res.json({ success: true });
})

router.post("/saveNotes", async(req, res) => {
    const id = req.query.id;
    // const completedTodo = req.body.todo; //work on this
    const todoByUserId = await Todo.findOne({userId});
    const textData = req.body.noteTextarea;
    todoByUserId.todos.findIndex(
        (todo) => todo.todoItem === completedTodo
    )
    console.log(textData);
    res.redirect(`/todo?id=${id}`);
})

module.exports = router;