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
app.use("/", require("./routes/indexRoute.ejs"));
// let todos = ["hello", "yoi"];
// app.get('/', (req, res) => {
//     res.render('index', {todos})
// })

app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'mysecret',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: false }
}))
app.use(passport.initialize());
app.use(passport.session());

app.get('/auth/google',
  passport.authenticate('google', { scope:
      [ 'email', 'profile' ] }
));

app.get('/auth/google/callback',
    passport.authenticate( 'google', {
        successRedirect: '/auth/protected',
        failureRedirect: '/auth/google/failure'
}));

app.get('/auth/google/failure', (req, res) => {
    res.send("something went wrong");
})

app.get('/auth/protected', isLoggedIn, (req, res) => {
    let name = req.user.displayName;
    res.send(`hello ${name}`);
})

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})