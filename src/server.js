require('./DataBase/sync.js');

const connection = require('./DataBase/connection');
const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 1337;


//routers

const publicationRouter = require('./Routers/publicationrouter');
const userRouter = require('./Routers/userRouter.js');
const communityRouter = require('./Routers/communityRouter');
const carRouter = require('./Routers/carRouter.js')
const customerRouter = require('./Routers/customerRouter.js');
const productRouter= require('./Routers/productRouter.js');
const userCommunityRouter = require('./Routers/userCommunityRouter.js');

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors({
  origin: 'http://localhost:3000'
}));

app.listen(port, () => {
  console.log("the application is running at the port: " + port);
})

//api
app.use('/api', communityRouter);
app.use('/api',userRouter);
app.use('/api',customerRouter);
app.use('/api',carRouter);
app.use('/api',productRouter);
app.use('/api',publicationRouter);
app.use('/api', userCommunityRouter);

