const{Model,DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');

class car extends Model{}

car.init({
carId:{
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
carName:{
    type: DataTypes.STRING,
        alloNull : false
},
carModel:{
    type: DataTypes.STRING,
    alloNull : false
},
carBrand:{
    type: DataTypes.STRING,
    alloNull : false
},
userId:{
    type : DataTypes.INTEGER,
    alloNull : false
}
},{
    sequelize : connection,
    modelName : 'car',
    paranoid: true,
    deletedAt: 'destroyTime'   
})

module.exports = car;