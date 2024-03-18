const {Model, DataTypes}= require('sequelize');
const connection = require('../DataBase/connection')

class userCommunity extends Model{}

userCommunity.init({
    userCommunityId:{
        type : DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    userId:{
        type : DataTypes.INTEGER,
        allowNull: false
    },
    communityId:{
        type : DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize : connection,
    modelName : 'userCommunity',
    paranoid: true,
    deletedAt: 'destroyTime'  
});

module.exports = userCommunity;