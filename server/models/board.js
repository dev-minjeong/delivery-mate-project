module.exports = (sequelize, DataTypes) => {
  return sequelize.define(
    'board',
    {
      board_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(50),
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
      view_cnt: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      food_id: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
      },
      join_cnt: {
        type: DataTypes.INTEGER(10),
        allowNull: false,
        defaultValue: 0,
      },
      writer_name: {
        type: DataTypes.STRING(20),
        allowNull: false,
        defaultValue: 0,
      },
      writer_lat: {
        type: DataTypes.DECIMAL(9, 7),
        allowNull: false,
      },
      writer_lon: {
        type: DataTypes.DECIMAL(10, 7),
        allowNull: false,
      },
      pay: {
        type: DataTypes.BOOLEAN,
        allowNull: false,
        defaultValue: false,
      },
    },
    {
      charset: 'utf8',
      collate: 'utf8_general_ci',
      timestamps: false,
    }
  );
};
