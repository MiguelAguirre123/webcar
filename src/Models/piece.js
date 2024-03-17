const {Model, DataTypes} = require('sequelize');
const connection = require('../DataBase/connection');

class piece extends Model{}

piece.init({
    pieceId:{
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    pieceName:{
        type: DataTypes.STRING,
        allowNull: false
    },
    pieceBrand:{
        type: DataTypes.STRING,
        allowNull: false
    },
    piecePrice:{
        type: DataTypes.DECIMAL,
        allowNull: false
    },
    pieceState:{
        type: DataTypes.STRING,
        allowNull: false
    },
},{
    sequelize: connection,
    modelName: 'piece',
    paranoid: true,
    deletedAt: 'destroyTime'
});

module.exports = piece;