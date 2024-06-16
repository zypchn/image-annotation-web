"use strict";
module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("User", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        role: {
            type: DataTypes.ENUM("Student", "Moderator"),
            allowNull: false
        },
        annotations: {
            type: DataTypes.JSON,
            allowNull: true
        }
    });
    
    User.associate = models => {
        User.belongsToMany(models.Tablet, {through: "usertablet", timestamps: false, });
    };
    
    return User;
}
