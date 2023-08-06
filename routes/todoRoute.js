const express = require('express');
const router = express.Router();
const {Todo} = require('../models/todoModel');

router.get("/", async (req, res)=>{
    try {
        const id = req.query.id;
        const todoByUserId = await Todo.findOne({userId: id});
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
    result.todos.push({todoItem:todo,todoNotes:"testing note"});
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

router.post("/saveNotes/:id", async(req, res) => {
    const id = req.params.id;
    console.log(id);
    const todoValue = req.body.todo;
    const todoByUserId = await Todo.findOne({userId: id});
    const textData = req.body.textContent;
    console.log("textcontent: " + textData)
    const userNotesArea = todoByUserId.todos.findIndex(
        (todo) => todo.todoItem === todoValue
    )
    todoByUserId.todos[userNotesArea].todoNotes = textData;
    todoByUserId.save();
    res.redirect(`/todo?id=${id}`);
})

module.exports = router;