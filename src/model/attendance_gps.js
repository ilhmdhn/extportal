const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const AttendanceGPS = sequelize.define('AttendanceGPS', {
  outlet: {
    type: DataTypes.STRING(15),
    allowNull: false
  },
  nip: {
    type: DataTypes.STRING(25),
    allowNull: false,
    primaryKey: true
  },
  attendance_time: {
    type: DataTypes.DATE,
    allowNull: false,
    primaryKey: true
  },
  pict: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  outlet_ori: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  type: {
    type: DataTypes.SMALLINT,
    allowNull: true,
    defaultValue: 0
  },
  name: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  distance: {
    type: DataTypes.INTEGER,
    allowNull: true
  },
  lat: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  long: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  accuracy: {
    type: DataTypes.DOUBLE,
    allowNull: true
  },
  is_face_recog: {
    type: DataTypes.ENUM('0', '1'),
    allowNull: true,
    defaultValue: false
  }
}, {
  tableName: 'attendance_gps',
  timestamps: false
});

module.exports = AttendanceGPS;