require('./DataBase/sync.js');

const connection = require('./DataBase/connection');
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;

//routers
const publicationrouter = require('./Routers/publicationrouter');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, ()=>{
    console.log('the app is running on port ' + port);
});

//api
app.use('/api', publicationrouter);