const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('tpt_example', 'root', 'password', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;
