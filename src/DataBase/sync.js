const connection = require('./connection');

//Models
const publication = require('../Models/publication');
const user = require('../Models/user');
const car = require('../Models/car')
const community = require('../Models/community');
const userCommunity = require('../Models/userCommunity');

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

    console.log("ingreso");
    user.hasMany(car,{
        foreignKey:'userId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    car.belongsTo(user,{
        foreignKey:'userId'
    });

    
//this is for the community-user table
/*    community.hasMany(user,{
        foreignKey:
    })
*/
}

sync();
