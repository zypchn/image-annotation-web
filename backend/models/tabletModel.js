module.exports = (sequelize, DataTypes) => {
    const Tablet =  sequelize.define("Tablets", {
        
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
            allowNull: false
        },
        status: {
            type: DataTypes.STRING,
            allowNull: false
        },
        path: {
            type: DataTypes.STRING,
            allowNull: false
        },
    });
    
    // TODO define associations
    
    return Tablet;
};