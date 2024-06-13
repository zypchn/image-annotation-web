module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define("User", {
    
    email: {
      type: DataTypes.STRING,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    annotations: {
      type: DataTypes.JSON,
      allowNull: true
    },
    role: {
      type: DataTypes.ENUM("Student","Moderator"),
      allowNull: false
    }
  });
  
  return User;
};