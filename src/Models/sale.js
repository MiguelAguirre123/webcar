const{Model,DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');


class sale extends Model{}

sale.init({
    saleId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    carId:{
        type : DataTypes.INTEGER,
        alloNull : true
    },
    pieceId:{
        type : DataTypes.INTEGER,
        alloNull : true
    },
    productId:{
        type : DataTypes.INTEGER,
        alloNull : true
    },
    publicationId:{
        type : DataTypes.INTEGER,
        alloNull : true
    }
},{
    sequelize : connection,
    modelName : 'sale',
    paranoid: true,
    deletedAt: 'destroyTime'      
});

module.exports=sale;