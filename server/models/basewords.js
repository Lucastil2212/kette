export default (sequelize, DataTypes) => {
  const BaseWords = sequelize.define("BaseWords", {
    base_word_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Words",
        key: "word_id",
      },
    },
    base_word: DataTypes.STRING,
    literal_meaning: DataTypes.STRING,
  });

  BaseWords.associate = (models) => {
    BaseWords.belongsTo(models.Words, {
      foreignKey: "word_id",
    });
  };

  return BaseWords;
};
