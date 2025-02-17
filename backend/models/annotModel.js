module.exports = (sequelize, DataTypes) => {
    return sequelize.define("Annotation", {
        
        pk_id: {
            type: DataTypes.STRING,
            allowNull: false,
            primaryKey: true
        },
        id: {
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
    },
    {
        timestamps: false
    });
};