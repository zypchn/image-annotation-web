const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Student extends Model {
    static associate(models) {
      Student.belongsTo(models.User, { foreignKey: "id" });
    }
  }
  
  Student.init({
    labels: {
      type: DataTypes.JSON,
      allowNull: true
    },
    assignedTablets: {
      type: DataTypes.JSON,
      allowNull: true
    }
  }, {
    sequelize,
    modelName: "Student",
    tableName: "Student",
    timestamps: true
  });
  
  return Student;
};