const {Model, DataTypes}= require('sequelize');
const connection = require('../DataBase/connection')

class customer extends Model{}

customer.init({

customerId:{
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
customerName:{
    type : DataTypes.STRING,
    unique: true,
    allowNull:false
},
customerPhone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
customerDescrip:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
customerAddress:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
customerEmail:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
}
},{
    sequelize : connection,
    modelName : 'customer',
    paranoid: true,
    deletedAt: 'destroyTime'   
});

module.exports = customer;