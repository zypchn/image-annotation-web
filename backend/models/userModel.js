"use strict";
const { Model, DataTypes} = require("sequelize");

module.exports = (sequelize, DataTypes) => {
    class User extends Model {}
    
    User.init({
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
    }, {
        sequelize,
        modelName: "user"
    });
    
    return User;
}
