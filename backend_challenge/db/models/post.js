"use strict";
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    "Post",
    {
      title: DataTypes.STRING,
      coffee: DataTypes.INTEGER,
      text: DataTypes.TEXT,
      rating: DataTypes.FLOAT,
    },
    {}
  );
  Post.associate = function (models) {
    // associations can be defined here
    Post.belongsTo(models.Coffee, { foreignKey: "coffee" });
  };
  return Post;
};
