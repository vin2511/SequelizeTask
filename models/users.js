module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("Users", {
    id: {
      type: DataTypes.INTEGER,
      allownull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    e_name: {
      type: DataTypes.STRING,
      allownull: false,
    },
    role_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    email: {
      type: DataTypes.STRING,
      allownull: false,
      defaultValue: "test@test.com",
    },
  });
  return Users;
};
  