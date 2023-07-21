const express = require('express');
const router = express.Router();
const todoSchema = require('../models/todoModel');


router.get("/", async (req,res)=>{
    try {
        const userName = "Neeru Kapoor";
        const profileId = req.query.id;
        console.log("here");
        console.log("profile id is: " + profileId);
        const todoss = await todoSchema.find({userName});
        console.log(todoss.userName);
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