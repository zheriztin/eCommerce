'use strict';


module.exports = {
  up: (queryInterface, Sequelize) => {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    const data = require("../data/category.json");
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkInsert('Categories',data,{})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    const data = require("../data/category.json");
    data.forEach(el => {
      el.createdAt = new Date()
      el.updatedAt = new Date()
    })
    return queryInterface.bulkDelete('Categories',data,{})
  }
  
};
