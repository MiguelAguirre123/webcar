const connection = require('./connection');

//Models 

const user = require('../Models/user');
const car = require('../Models/car')
/*
const restaurant = require('../Models/restaurant');
const product = require('../Models/product');*/

function sync(){

    console.log("ingreso");
    user.hasMany(car,{
        foreignKey:'userId',
        onDelete: 'restrict',
        onUpdate: 'cascade'
    });
    car.belongsTo(user,{
        foreignKey:'userId'
    })
}

sync();