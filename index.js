const express = require('express');
const path = require('path');
const port = 7777;
const app = express();
const bodyParser = require('body-parser')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }))
app.use('/',require('./routes'));

app.listen(port,function(err){
    if(err){
        console.log("Error is: ",err);
    }
    console.log("App running on port : ",port);
})