const{Sequelize,Model,DataTypes}   = require('sequelize');

let dbConfig ={
    db_name :'employee',
    db_user : 'root',
    db_pass: '12345678',
    connection_type:'mysql',
    port:'3306',
    host:"localhost"
}

const sequelizeTZ = new Sequelize(dbConfig.db_name,dbConfig.db_user,dbConfig.db_name.pass,{
    host:dbConfig.host,
    dialect:dbConfig.connection_type,
    port:dbConfig.port
});

const connection = {};

connection.Sequelize = Sequelize;
connection.sequelizeTZ = sequelizeTZ;
connection.Model =Model;
connection.DataTypes = DataTypes;

module.export = connection;  
