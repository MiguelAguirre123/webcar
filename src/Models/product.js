const{Model,DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');


class product extends Model{}

product.init({
    productId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    productName:{
        type: DataTypes.STRING,
        alloNull : false
    },
    productDescription: {
        type : DataTypes.STRING,
        alloNull : false
    },
    productPrice:{
        type: DataTypes.FLOAT,
        alloNull : false
    },

    customerId:{
        type : DataTypes.INTEGER,
        alloNull : false
    }

},{
    sequelize : connection,
    modelName : 'product',
    paranoid: true,
    deletedAt: 'destroyTime'      
});

module.exports=product;