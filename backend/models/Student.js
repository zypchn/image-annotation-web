module.exports = (sequelize, DataTypes) => {
  const Student = sequelize.define("Student", {
    
    username: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    labels: {
      type: DataTypes.JSON,
      allowNull: true
    }
  });
  
  // TODO define associations and functions
  // function: label()
  
  return Student;
};