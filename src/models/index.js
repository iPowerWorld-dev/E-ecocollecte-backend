const Sequelize = require('sequelize');
const sequelize = require('../config/database');

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.User = require('./User')(sequelize, Sequelize);
db.Collecte = require('./Collecte')(sequelize, Sequelize);

module.exports = db;
