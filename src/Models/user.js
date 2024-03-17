const {Model, DataTypes}= require('sequelize');
const connection = require('../DataBase/connection')

class user extends Model{}

user.init({

userId:{
    type : DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
},
userName:{
    type : DataTypes.STRING,
    unique: true,
    allowNull:false
},
userPhone: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
userNickName:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
userAddress:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
},
userEmail:{
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
}
},{
    sequelize : connection,
    modelName : 'user',
    paranoid: true,
    deletedAt: 'destroyTime'   
});

module.exports = user;