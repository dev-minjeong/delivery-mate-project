'use strict';

const path = require('path');
const Sequelize = require('sequelize');

const env = process.env.NODE_ENV || 'development';
const config = require(path.join(__dirname, '..', 'config', 'db.json'))[env];
const db = {};

let sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  config,
  {
    define: {
      charset: 'utf8',
      collate: 'utf8_general_ci',
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize
  .authenticate()
  .then(() => {
    console.log('connection has established successfully');
  })
  .catch((err) => {
    console.log('unable to connection to the database', err);
  });

db.Admin = require('./admin')(sequelize, Sequelize);
db.Board = require('./board')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);

// 1대 M관계
db.Category.hasMany(db.Board, {
  foreignKey: 'food_id',
  sourceKey: 'id',
});
db.Board.belongsTo(db.Category, {
  foreignKey: 'food_id',
  targetKey: 'id',
});

// db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;
