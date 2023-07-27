const { Sequelize, DataTypes } = require("sequelize");

const sequelize = new Sequelize("employee", "vineeta", "Vin@12345", {
  host: "localhost",
  dialect: "mysql",
  logging:false,
  pool: { max: 5, min: 0, idle: 10000 },
});

sequelize
  .authenticate()
  .then(() => {
    console.log("Connected");
  })
  .catch((error) => {
    console.log("Error in connection" + error);
  });

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.sequelize.sync({ force: false }).then(() => {
  console.log("Yes , Database synced ");
});

db.users = require("./users")(sequelize, DataTypes);
module.exports = db;
