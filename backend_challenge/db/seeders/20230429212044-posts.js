"use strict";

let options = {};
if (process.env.NODE_ENV === "production") {
  options.schema = process.env.SCHEMA; // define your schema in options object
}

module.exports = {
  up: (queryInterface, Sequelize) => {
    options.tableName = "Posts";
    return queryInterface.bulkInsert(options, [
      {
        title: "The First Cup",
        coffee: 2,
        text: "I can't quite remember what it was, but it was made by Ann, I loved it because of that.",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Second Cup",
        coffee: 1,
        text: "She always makes the best coffee, I don't think there is any other like it.",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "The Third Cup",
        coffee: 3,
        text: "Ann made me a latte, this time with honey and cinnamon. She always puts so much of herself into the coffee she makes.",
        rating: 5,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Mediocre Cup",
        coffee: 2,
        text: "This time the espresso was not as tasty as I expected. ",
        rating: 3,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        title: "Watered down Coffee",
        coffee: 1,
        text: "The coffee was watered down for sure.",
        rating: 1,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ]);
  },

  down: (queryInterface, Sequelize) => {
    options.tableName = "Posts";
    return queryInterface.bulkDelete(options);
  },
};
