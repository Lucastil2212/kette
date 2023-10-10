export default (sequelize, DataTypes) => {
  const Words = sequelize.define("Words", {
    word_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    word: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    category_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Categories",
        key: "category_id",
      },
    },
    definition: DataTypes.TEXT,
    literal_definition: DataTypes.TEXT,
    usage_notes: DataTypes.TEXT,
    example_sentence: DataTypes.TEXT,
  });

  Words.associate = (models) => {
    Words.belongsTo(models.Categories, {
      foreignKey: "category_id",
    });
    Words.hasMany(models.BaseWords, {
      foreignKey: "word_id",
    });
  };

  return Words;
};
