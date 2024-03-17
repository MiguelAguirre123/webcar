const connection = require('./connection');

//Models 

const user = require('../Models/user');
const car = require('../Models/car');
const userCommunity = require('../Models/userCommunity');
const community = require('../Models/community');

function sync(){

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
}

sync();