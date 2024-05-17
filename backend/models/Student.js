const { DataTypes } = require('sequelize');
const User = require('./User');

class Student extends User {}

Student.init({
  labels: {
    type: DataTypes.JSON,
    allowNull: true,
  },
}, {
  sequelize,
  modelName: 'Student',
});

Student.prototype.annotate = function () { // prototype daha efficient memory usage sağlıyor
  // TODO annot logic.
};

module.exports = Student;
