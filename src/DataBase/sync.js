const connection = require('./connection');

//Models 

const user = require('../Models/user');
const car = require('../Models/car')
const community = require('../Models/community');
const userCommunity = require('../Models/userCommunity');

function sync(){
// this is for the car-user table
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