module.exports = (sequelize, DataTypes) => {
    return Tablet = sequelize.define("Tablets", {
        
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
        annotations: {
            type: DataTypes.JSON,
            allowNull: true,
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        }
    });
};