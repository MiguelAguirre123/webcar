const { Sequelize } = require('sequelize'); 

var dataBase = 'WebCar'; 
var userName = 'postgres'; 
var password = 'postgres'; 

const connection = new Sequelize(dataBase, userName, password, { 
    host: 'localhost', 
    dialect: 'postgres' 
}); 

module.exports = connection;  
