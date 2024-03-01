require('./DataBase/sync.js');

const connection = require('./DataBase/connection');
const express = require('express');
const app = express();
const port = process.env.PORT || 3000;

//routers
//const restaurantrouter = require('./Routers/restaurantrouter');

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
//app.use('/api', restaurantrouter);