const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todoModel');

router.get("/", async (req,res)=>{
    try {
        const userId = req.query.id;
        const todosByUserId = await todoSchema.findOne({userId});
        console.log("todos user id:  "+todosByUserId);
        // if(!todosByUserId) {
            // let todoListOfUser = [];
            res.render('todo', {todosByUserId});
        // }
        // else {
            // todoListOfUser = todosByUserId.todos;
            // res.render('todo', {todosByUserId});
        //}
    }
    catch (e) {
        console.error(e)
    }
})

router.post("/", async (req,res) => {
    const id = req.query.id;
    const todo = req.body.todo;
    const result = await todoSchema.findOne({userId: id});
    result.todos.push(todo);
    result.save();
    res.redirect(`/todo?id=${id}`);
})

module.exports = router;