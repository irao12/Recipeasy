const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
	class History extends Model {}

	History.init(
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
			modelName: "history",
		}
	);

	History.associate = (models) => {
		// associations
	};

	return History;
};
