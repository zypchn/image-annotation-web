module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Annotation", {
        
        annotID: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        comment: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lang: {
            type: DataTypes.STRING,
            allowNull: false
        },
        col_no: {
            type: DataTypes.TINYINT,
            allowNull: false,
        },
        row_no: {
            type: DataTypes.TINYINT,
            allowNull: false
        },
        mark: {
            type: DataTypes.JSON,
            allowNull: false
        }
        /*
        x_coord: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        y_coord: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        height: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
        width: {
            type: DataTypes.DOUBLE,
            allowNull: false
        },
         */
        
    },
    {
        timestamps: false
    });
};