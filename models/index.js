'use strict';

const fs = require('fs');
const path = require('path');
let Sequelize = require('sequelize');
const basename = path.basename(__filename);
const { DataTypes } = require('sequelize');
const config = {
 DB_DATABASE: 'mysql',
  DB_USERNAME: 'epiz_33113235',
  DB_PASSWORD: 'O9mR5HxTCTofBOa',
  DB_ADAPTER: 'mysql',
  DB_NAME: `epiz_33113235_XXX`,
  DB_HOSTNAME: 'sql213.epizy.com',
  DB_PORT: 3306,
 
};

let db = {};

let sequelize = new Sequelize(config.DB_DATABASE, config.DB_USERNAME, config.DB_PASSWORD, {
  dialect: config.DB_ADAPTER,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  host: config.DB_HOSTNAME,
  port: config.DB_PORT,
  logging: console.log,
  timezone: '+05:00',
  pool: {
    maxConnections: 1,
    minConnections: 0,
    maxIdleTime: 100,
  },
  define: {
    timestamps: false,
    underscoredAll: true,
    underscored: true,
  },
});

sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
//sequelize.sync({ force: true });

fs.readdirSync(__dirname)
  .filter((file) => {
    return file.indexOf('.') !== 0 && file !== basename && file.slice(-3) === '.js';
  })
  .forEach((file) => {
    var model = require(path.join(__dirname, file))(sequelize, DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
