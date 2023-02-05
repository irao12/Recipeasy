const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Favorite extends Model {}

	Favorite.init(
		{
			userID: {
				type: DataTypes.INTEGER,
				allowNull: true,
			},
			recipeID: {
				type: DataTypes.INTEGER,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageURL: {
				type: DataTypes.STRING,
			},
			ingredients: {
				type: DataTypes.ARRAY(DataTypes.STRING),
			},
		},
		{
			sequelize,
			modelName: "favorite",
		}
	);

	Favorite.associate = (models) => {
		// associations
	};

	return Favorite;
};
