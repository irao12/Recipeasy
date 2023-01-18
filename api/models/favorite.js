const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class Favorite extends Model {}

	Favorite.init(
		{
			recipeID: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			title: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageURL: {
				type: DataTypes.STRING,
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
