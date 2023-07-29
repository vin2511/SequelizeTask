module.exports = (sequelize, DataTypes) => {
  const Contact = sequelize.define("Contacts", {
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate:{
        len:[10]
      }
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: false,
  
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },

  });
  return Contact;
};
