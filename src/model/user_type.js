const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const UserType = sequelize.define('UserType', {
  ID: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false,
    autoIncrement: true
  },
  UserType: {
    type: DataTypes.STRING(255),
    allowNull: false
  }
}, {
  tableName: 'UserType',
  timestamps: false
});

module.exports = UserType;