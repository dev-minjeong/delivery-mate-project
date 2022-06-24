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
      collate: 'utf8_bin',
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

db.Teacher = require('./teacher')(sequelize, Sequelize);
db.Class = require('./class')(sequelize, Sequelize);

/** 1대 1 관계 (Teacher(source모델) : Class(target모델)) - hasOne
 * 두개의 테이블이 하나의 foreignKey로 연결된 관계
db.Teacher.hasOne(db.Class);
 */
/** 1대 M 관계 (Teacher : Classes) - hasMany, belongsTo
 * 두개의 테이블이 두개의 foreignKey로 연결된 관계
db.Teacher.hasMany(db.Class, {
  foreignKey: 'teacher_id',
  sourceKey: 'id',
});
db.Class.belongsTo(db.Teacher, {
  foreignKey: 'teacher_id',
  targetKey: 'id',
});
 */
/** N대 M관계 (Teachers : Classes) - belongsToMany
 * 두개의 테이블에 여러개의 foreignKey로 이루어진 관계
 */
db.Teacher.belongsToMany(db.Class, {
  through: 'schedule',
  foreignKey: 'teacher_id',
});
db.Class.belongsToMany(db.Teacher, {
  through: 'schedule',
  foreignKey: 'class_id',
});

db.secret = '(9*)5$&!3%^0%^@@2$1!#5@2!4';
module.exports = db;
