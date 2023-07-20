const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todoModel');


router.get("/", async (req,res)=>{
    try {
        const userId = "cxn";
        const todoss = await todoSchema.find({userId});
        res.render('todo', {todoss});
        // res.status(500).send('Server Error');
    }
    catch (e) {
        console.error(e)
    }
})

router.post("/", (req,res) => {
    let newItem = req.body.todo;
    todos.push(newItem)
    res.redirect('/todo');
})

module.exports = router;