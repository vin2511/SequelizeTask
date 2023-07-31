module.exports = (sequelize, DataTypes, Model) => {
  class Contact extends Model {}

  Contact.init({
    phone_no: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: [10]
      }
    },
    permanent_address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    current_address: {
      type: DataTypes.STRING,
      allowNull: true
    }
  },
  {
    sequelize,
    modelName: 'Contact'
  })

  return Contact
}
