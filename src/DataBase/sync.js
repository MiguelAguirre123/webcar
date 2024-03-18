const connection = require('./connection');

//Models
const publication = require('../Models/publication');
const user = require('../Models/user');
const car = require('../Models/car')
const userCommunity = require('../Models/userCommunity');
const community = require('../Models/community');

//JSON
/*
const departmentjson = require('./JsonFiles/departmentjson');
const cityjson = require('./JsonFiles/cityjson');
*/

async function sync(){

    // foreign key user car.
    user.hasMany(car,{
        foreignKey:'userId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    car.belongsTo(user,{
        foreignKey:'userId'
    })

    // foreign key user userCommunity.
    user.hasMany(userCommunity,{
        foreignKey: 'userId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    userCommunity.belongsTo(user,{
        foreignKey: 'userId'
    });

    // foreing key community userCommunity.
    community.hasMany(userCommunity,{
        foreignKey: 'communityId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    userCommunity.belongsTo(community,{
        foreignKey: 'communityId'
    });

    // foreing key user publication.
    user.hasMany(publication,{
        foreignKey: 'userId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    publication.belongsTo(user,{
        foreignKey: 'userId'
    });

    await connection.sync({force: false})
    .then(() => {
        console.log('Base de datos sincronizada');
    })
    .catch((error) => {
        console.error('Error al sincronizar la base de datos: ', error)
    });

    console.log("ingreso");

    //create json
    /*
    departmentjson.createDepartments();
    cityjson.createCities();
    */
}

sync();