module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User_Tablet", {},
        {timestamps: false});
};