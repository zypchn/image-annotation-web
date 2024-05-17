const { DataTypes } = require('sequelize');
const User = require('./User');

class Moderator extends User {}

Moderator.init({
  labels: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Moderator',
});

Moderator.prototype.annotate = function () {
  // TODO
};

Moderator.prototype.assign = function () {
  // TODO
};

module.exports = Moderator;
