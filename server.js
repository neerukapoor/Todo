const express = require('express')
const app = express()
const path =require('path');

const PORT = process.env.PORT || 4600;

const dotenv = require('dotenv');
dotenv.config();

//Middleware  
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use("/", require("./routes/indexRoute.ejs"));
// let todos = ["hello", "yoi"];
// app.get('/', (req, res) => {
//     res.render('index', {todos})
// })
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})