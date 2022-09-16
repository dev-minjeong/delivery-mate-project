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
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
    },
  }
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;
db.sequelize
  .authenticate()
  .then(() => {
    console.log('connection has established successfully 연결성공');
  })
  .catch((err) => {
    console.log('unable to connection to the database:', err);
  });

db.Board = require('./board')(sequelize, Sequelize);
db.Category = require('./category')(sequelize, Sequelize);
db.User = require('./user')(sequelize, Sequelize);
db.Reply = require('./reply')(sequelize, Sequelize);
db.Join = require('./join')(sequelize, Sequelize);

// 1대 M관계
db.Category.hasMany(db.Board, {
  foreignKey: 'food_id',
  sourceKey: 'id',
});
db.Board.belongsTo(db.Category, {
  foreignKey: 'food_id',
  targetKey: 'id',
});

db.User.hasMany(db.Reply, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});
db.Reply.belongsTo(db.User, {
  foreignKey: 'user_id',
  sourceKey: 'user_id',
});

// N대 M관계
db.Board.belongsToMany(db.User, {
  through: 'join',
  foreignKey: 'board_id',
});
db.User.belongsToMany(db.Board, {
  through: 'join',
  foreignKey: 'name',
});

module.exports = db;
