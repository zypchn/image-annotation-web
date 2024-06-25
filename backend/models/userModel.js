module.exports = (sequelize, DataTypes) => {
    return sequelize.define("User", {
        
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
        verified: {
            type: DataTypes.ENUM("verified", "not-verified")
        }
    });
};
