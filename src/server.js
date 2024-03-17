require('./DataBase/sync.js');

const connection = require('./DataBase/connection');
const express = require('express');
const app = express();
const port = process.env.PORT || 1337;


//routers
const publicationrouter = require('./Routers/publicationRouter.js');
const userRouter = require('./Routers/userRouter.js');
const communityRouter = require('./Routers/communityRouter');
const carRouter = require('./Routers/carRouter.js')
const customerRouter = require('./Routers/customerRouter.js');
const productRouter= require('./Routers/productRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.listen(port, ()=>{
    console.log('the app is running on port ' + port);
});

//api
app.use('/api', publicationrouter);
app.use('/api', communityRouter);
app.use('/api',userRouter);
app.use('/api',customerRouter);
app.use('/api',carRouter);
app.use('/api',productRouter);


