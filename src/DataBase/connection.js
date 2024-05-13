const { Sequelize } = require('sequelize'); 

var dataBase = 'webCar'; 
var userName = 'postgres'; 
var password = 'Sarisbo22'; 

const connection = new Sequelize(dataBase, userName, password, { 
    host: 'localhost', 
    dialect: 'postgres' 
}); 

module.exports = connection;  
