const crypto = require("crypto");

function hash(value) {
  const hash = crypto.createHash("sha256");
  hash.update(value);
  return hash.digest("hex");
}

module.exports = (sequelize, DataTypes, Model) => {
  class User extends Model {}

  User.init(
    {
      firstName: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          isAlpha: true,
          len: [2, 20],
          notNull: {
            msg: "Please enter your first name.",
          },
        },
        get() {
          const rawValue = this.getDataValue("firstName");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      lastName: {
        type: DataTypes.STRING,
        get() {
          const rawValue = this.getDataValue("lastName");
          return rawValue ? rawValue.toUpperCase() : null;
        },
      },
      fullName: {
        type: DataTypes.VIRTUAL,
        get() {
          return `${this.firstName} ${this.lastName}`;
        },
        set(value) {
          throw new Error("Do not try to set the `fullName` value!");
        },
      },

      email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
          isEmail: true,
        },
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
        set: async function (value) {
          const hashedPassword = await hash(value);
          this.setDataValue("password", hashedPassword);
        },
      },
      status: {
        type: DataTypes.STRING,
        defaultValue: "inactive",
      },
    },
    {
      createdAt: false,
      updatedAt: true,
      sequelize,
    }
  );

  return User;
};
