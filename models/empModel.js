const dbConfig = require("../config/db");
const Model = dbConfig.Model;
const sequelize = dbConfig.sequelizeTZ ;

const Op = dbConfig.Sequelize.Op;

class userModel extends Model {

}

userModel.init(
  {
    id: {
      type: dbConfig.Sequelize.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    e_name: {
      type: dbConfig.Sequelize.STRING,
      allowNull: false,
    },
    role_id: {
      type: dbConfig.Sequelize.INTEGER,
      allowNull: false,
    },
    email: {
      type: dbConfig.Sequelize.STRING,
      allowNull: false,
    },
    password: {
      type: dbConfig.Sequelize.STRING,
      allowNull: false,
    },
    created_at: {
      type: dbConfig.Sequelize.DATE,
      allowNull: false,
      defaultValue: new Date().toISOString(),
    },
    updated_at: {
      type: dbConfig.Sequelize.DATE,
      allowNull: true,
      defaultValue: new Date().toISOString(),
    },
  },
  {
    sequelize,
    timestamps: false,
    modelName: "employee1",
    freezeTableName: true,
  }
);
