require('./DataBase/sync.js');

const connection = require('./DataBase/connection');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;


//routers
const userRouter = require('./Routers/userRouter.js');
const communityRouter = require('./Routers/communityRouter');
const carRouter = require('./Routers/carRouter.js')

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

connection.sync({force: false})
    .then(() => {
        console.log('Base de datos sincronizada');
        app.listen(port, ()=>{
            console.log('the app is running on port ' + port);
        });
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos: ', error)
    });

//api
app.use('/api', communityRouter);
app.use('/api',userRouter);
app.use('/api',carRouter);