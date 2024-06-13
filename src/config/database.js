const { Sequelize } = require('sequelize');

const sequelize = new Sequelize("ecocollect", "postgres", "postgrepassword", {
  host: "localhost",
  dialect: "postgres",
  logging: false,
});

module.exports = sequelize;
