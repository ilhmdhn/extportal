const { DataTypes } = require('sequelize');
const sequelize = require('../lib/db');

const Employee = sequelize.define('Employee', {
  NIP: {
    type: DataTypes.STRING(20),
    primaryKey: true,
    allowNull: false
  },
  EMail: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Pass: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Outlet: {
    type: DataTypes.STRING(50),
    primaryKey: true,
    allowNull: false
  },
  Level: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Signature: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Token: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  TokenDate: {
    type: DataTypes.DATE,
    allowNull: true
  },
  OutletAkses: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  FirstName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  MiddleName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  LastName: {
    type: DataTypes.STRING(255),
    allowNull: true
  },
  Picture: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  Gender: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Status: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  Initials: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  Initials_2: {
    type: DataTypes.STRING(2),
    allowNull: true
  },
  employmentDate: {
    type: DataTypes.DATE,
    field: 'Employment Date'
  },
  Departemen: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Pangkat: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  PangkatCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Jabatan: {
    type: DataTypes.STRING(50),
    allowNull: true
  },
  JabatanCode: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  Phone: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  Sex: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  key_notif: {
    type: DataTypes.TEXT('long'),
    allowNull: true
  },
  color_bg: {
    type: DataTypes.STRING(20),
    allowNull: true
  },
  color_txt: {
    type: DataTypes.SMALLINT,
    allowNull: true
  },
  bpjs_sehat: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  bpjs_kerja: {
    type: DataTypes.STRING(10),
    allowNull: true
  },
  face: {
    type: DataTypes.TEXT,
    allowNull: true
  }
}, {
  tableName: 'Employee',
  timestamps: false
});

module.exports = Employee;