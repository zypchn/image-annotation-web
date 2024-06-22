module.exports = (sequelize, DataTypes) => {
    return sequelize.define("UserOTP", {
        otp: {
            type: DataTypes.STRING
        },
        expiresAt: {
            type: DataTypes.DATE
        }
    }, {timestamps: false});
};