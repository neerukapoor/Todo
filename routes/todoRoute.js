const express = require('express');
const router = express.Router();

let todos = ["hello", "yoi"];
router.get("/", (req,res)=>{
    res.render('todo', {todos});
})

router.post("/", (req,res) => {
    let newItem = req.body.todo;
    todos.push(newItem)
    res.redirect('/todo');
})

module.exports = router;