"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Coffees";
    return queryInterface.bulkInsert(options, [
      {
        name: "Black",
        year: 1671,
        caffeine_content: 12,
        caffeine_percentage: 75,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Espresso",
        year: 1906,
        caffeine_content: 64,
        caffeine_percentage: 100,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        name: "Latte",
        year: 1950,
        caffeine_content: 64,
        caffeine_percentage: 50,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Coffees";
    return queryInterface.bulkDelete(options);
  },
};
