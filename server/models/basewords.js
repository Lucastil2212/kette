export default (sequelize, DataTypes) => {
  const basewords = sequelize.define(
    "basewords",
    {
      base_word_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      word_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "words",
          key: "word_id",
        },
      },
      base_word: DataTypes.STRING,
      literal_meaning: DataTypes.STRING,
    },
    {
      timestamps: false,
    }
  );

  basewords.associate = (models) => {
    basewords.belongsTo(models.words, {
      foreignKey: "word_id",
    });
  };

  return basewords;
};
