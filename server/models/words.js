export default (sequelize, DataTypes) => {
  const words = sequelize.define(
    "words",
    {
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
          model: "categories",
          key: "category_id",
        },
      },
      definition: DataTypes.TEXT,
      literal_definition: DataTypes.TEXT,
      usage_notes: DataTypes.TEXT,
      example_sentence: DataTypes.TEXT,
    },
    {
      timestamps: false,
    }
  );

  words.associate = (models) => {
    words.belongsTo(models.categories, {
      foreignKey: "category_id",
    });
    words.hasMany(models.basewords, {
      foreignKey: "word_id",
    });
  };

  return words;
};
