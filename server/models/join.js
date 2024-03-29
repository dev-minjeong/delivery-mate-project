module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'join',
    {
      join_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      mate_lat: {
        type: DataTypes.DECIMAL(9, 7),
        allowNull: false,
      },
      mate_lon: {
        type: DataTypes.DECIMAL(10, 7),
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
