const express = require('express')
const passport = require('passport');
var session = require('express-session');
const app = express()
const path =require('path');

const PORT = process.env.PORT || 4600;

const dotenv = require('dotenv');
dotenv.config();

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401)
}

//Middleware  
app.set('view engine', 'ejs');
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

function isLoggedIn(req, res, next){
    req.user ? next() : res.sendStatus(401);
}

require("./auth");
app.use("/todo", require('./routes/todoRoute'));
app.use("/", require('./routes/indexRoute'));


app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))

app.use(passport.initialize());
app.use(passport.session());

app.use('/auth/google', require("./routes/authRoute.js"));


app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})