const {Model, DataTypes}= require('sequelize');
const connection = require('../DataBase/connection');

class community extends Model{};

community.init({
    communityId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    communityName:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    communityCreator:{
        type: DataTypes.STRING,
        allowNull: false
    },
    communityDescription:{
        type: DataTypes.STRING,
        allowNull: false
    }
},{
    sequelize: connection,
    modelName: 'community',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports=community;