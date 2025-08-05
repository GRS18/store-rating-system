const { Sequelize, DataTypes } = require('sequelize');
require('dotenv').config();

const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT
  }
);

sequelize.authenticate()
  .then(() => console.log('✅ Connected to MySQL successfully!'))
  .catch(err => console.error('❌ Unable to connect:', err));

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.User = require('./user.model')(sequelize, DataTypes);
db.Store = require('./store.model')(sequelize, DataTypes);
db.Rating = require('./rating.model')(sequelize, DataTypes);

db.User.hasMany(db.Rating);
db.Store.hasMany(db.Rating);
db.Rating.belongsTo(db.User);
db.Rating.belongsTo(db.Store);

module.exports = db;