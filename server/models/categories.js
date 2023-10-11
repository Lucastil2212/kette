export default (sequelize, DataTypes) => {
  const categories = sequelize.define(
    "categories",
    {
      category_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      category_name: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
      },
    },
    {
      timestamps: false,
    }
  );

  categories.associate = (models) => {
    categories.hasMany(models.words, {
      foreignKey: "category_id",
    });
  };

  return categories;
};
