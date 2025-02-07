module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Tablet", {
        
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        width: {
            type: DataTypes.DOUBLE,
            allowNull: false,
        },
        status: {
            type: DataTypes.ENUM("pending", "ready to check", "done"),
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
        isLocked: {
            type: DataTypes.TINYINT(1),
            allowNull: false
        },
        customID: {
            type: DataTypes.STRING,
            allowNull: true
        }
    });
};