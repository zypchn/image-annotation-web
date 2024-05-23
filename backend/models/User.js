const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate(models) {
      User.hasOne(models.Student, { foreignKey: "id" });
      User.hasOne(models.Moderator, { foreignKey: "id" });
    }
  }
  
  User.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    }
  }, {
    sequelize,
    modelName: "User",
    tableName: "User",
    timestamps: true
  });
  
  return User;
};