module.exports = (sequelize, DataTypes) => {
  const Moderator = sequelize.define("Moderator", {
    
    name: {
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
  // functions: label() and assignTablet()
  
  return Moderator;
};