module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'category',
    {
      name: {
        type: DataTypes.STRING(30),
        allowNull: false,
      },
    },
    {
      charset: 'utf8mb4',
      collate: 'utf8mb4_general_ci',
      timestamps: false,
    }
  );
};
