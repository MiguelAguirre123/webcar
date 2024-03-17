const {Model, DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');

class User extends Model{

}

product.init({
    AdminId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    AdminName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AdminEmail: {
        type: DataTypes.STRING,
        allowNull: false
    },
    AdminAddress: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    AdminPhone:{
        type: DataTypes.INTEGER,
        allowNull: false
    },
},{
    sequelize: connection,
    modelName: 'Admin',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = administrator;