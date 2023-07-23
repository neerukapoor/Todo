const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todoModel');

router.get("/", async (req,res)=>{
    try {
        const userId = req.query.id;
        const todosByUserId = await todoSchema.findOne({userId});
        if(!todosByUserId) {
            let todoListOfUser = [];
            res.render('todo', {todoListOfUser});
        }
        else {
            todoListOfUser = todosByUserId.todos;
            res.render('todo', {todoListOfUser});
        }
    }
    catch (e) {
        console.error(e)
    }
})

router.post("/", async (req,res) => {
    res.redirect('/todo');
})

module.exports = router;