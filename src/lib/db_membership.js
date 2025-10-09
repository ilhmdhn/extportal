const { Sequelize } = require('sequelize');
const env = process.env;

const sequelize = new Sequelize(env.DATABASE_MEMBERSHIP_NAME, env.DATABASE_MEMBERSHIP_USER, env.DATABASE_MEMBERSHIP_PASSWORD, {
  host: env.DATABASE_MEMBERSHIP_HOST,
  port: env.DATABASE_MEMBERSHIP_PORT,
  dialect: 'mysql',
  logging: false,
  define: {
    freezeTableName: true,
    timestamps: false
  },
  pool: {
    max: 10,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  dialectOptions: {
    charset: 'utf8mb4',
  }
});

module.exports = sequelize;