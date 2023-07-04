const express = require('express')
const app = express()
const path =require('path');

const PORT = process.env.PORT || 4500;

//Middleware  
app.set('view engine', 'ejs');


app.use("/", require("./routes/indexRoute.ejs"));
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, ()=>{
    console.log(`server running on port ${PORT}`);
})