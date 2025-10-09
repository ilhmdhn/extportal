const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const UserAccessApps = sequelize.define('UserAccessApps', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    allowNull: false
  },
  menu: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  access: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: 0
  },
  list_all: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: 0
  },
  approver: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: 0
  }
}, {
  tableName: 'user_access_apps',
  timestamps: false
});

module.exports = UserAccessApps;