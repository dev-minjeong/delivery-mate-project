// const { DataTypes } = require('sequelize/types');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'teacher',
    {
      name: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_bin',
      timestamp: false,
    }
  );
};
