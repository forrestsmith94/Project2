module.exports = function (sequelize, DataTypes) {
	var Post = sequelize.define("Post", {
		title: DataTypes.STRING,
		body: DataTypes.TEXT
	});

	return Post;
};
