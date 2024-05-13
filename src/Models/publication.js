const {Model, DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');

class publication extends Model{}

publication.init({
    publicationId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    /*
    publicationCreator:{
        type: DataTypes.STRING,
        unique: true,
        allowNull: false
    },
    */
    publicationContent:{
        type: DataTypes.STRING,
        allowNull: false
    },
    userId:{
        type: DataTypes.INTEGER,
        allowNull: false
    }
},{
    sequelize: connection,
    modelName: 'publication',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = publication;