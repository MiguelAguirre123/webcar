const connection = require('./connection');

//Models
const publication = require('../Models/publication');

//JSON
/*
const departmentjson = require('./JsonFiles/departmentjson');
const cityjson = require('./JsonFiles/cityjson');
*/

async function sync(){

    //Foreign Key restaurant - product
    /*
    restaurant.hasMany(product,{
        foreignKey: 'restaurantId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    product.belongsTo(restaurant,{
        foreignKey: 'restaurantId'
    })
    */

    await connection.sync({force: false})
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos: ', error)
    });

    //create json
    /*
    departmentjson.createDepartments();
    cityjson.createCities();
    */
}

sync();