const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Moderator extends Model {
    static associate(models) {
      Moderator.belongsTo(models.User, { foreignKey: "id" });
    }
  }
  
  Moderator.init({
    labels: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: "Moderator",
    tableName: "Moderator",
    timestamps: true
  });
  
  return Moderator;
};