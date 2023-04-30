"use strict";
module.exports = (sequelize, DataTypes) => {
  const Coffee = sequelize.define(
    "Coffee",
    {
      name: DataTypes.STRING,
      year: DataTypes.INTEGER,
      caffeine_content: DataTypes.FLOAT,
      caffeine_percentage: DataTypes.FLOAT,
    },
    {}
  );
  Coffee.associate = function (models) {
    // associations can be defined here
    Coffee.hasMany(models.Post, {
      foreignKey: "coffee",
      onDelete: "CASCADE",
      hooks: true,
    });
  };
  return Coffee;
};
