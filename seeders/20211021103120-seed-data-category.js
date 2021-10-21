'use strict';
const fs = require("fs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./data/category.json", "utf-8"))
    data.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
    })
    return queryInterface.bulkInsert('Categories', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Categories', null, {});
  }
};
