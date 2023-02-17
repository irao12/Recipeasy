const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class IngredientList extends Model {}

	IngredientList.init(
		{
			ingredients: {
				type: DataTypes.ARRAY(DataTypes.STRING),
				defaultValue: [],
			},
		},
		{
			sequelize,
			modelName: "ingredientList",
		}
	);

	IngredientList.associate = (models) => {
		// associations
		IngredientList.belongsTo(models.user);
	};

	return IngredientList;
};
