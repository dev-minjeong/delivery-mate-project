// const { DataTypes } = require('sequelize/types');
// const { sequelize } = require('.');

module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'class',
    {
      className: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_bin',
      timestamps: false,
    }
  );
};
