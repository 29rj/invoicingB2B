const express = require('express');
const path = require('path');
const port = 6969;
const app = express();
const bodyParser = require('body-parser')
const db = require('./models/users')

app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'));

// app.get('/', (request, response) => {
//     response.json({ info: 'Node.js, Express, and Postgres API' });
// });

app.use(bodyParser.json());
app.use(
    bodyParser.urlencoded({
      extended: true,
    }))

app.use('/',require('./routes'));

// app.get('/get',db.getUsers);
// app.post('/post',db.postUsers);



app.listen(port,function(err){
    if(err){
        console.log("Error is: ",err);
    }
    console.log("App running on port : ",port);
})