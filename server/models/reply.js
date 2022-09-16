module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'reply',
    {
      reply_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      board_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      contents: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      date: {
        type: DataTypes.DATE,
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
