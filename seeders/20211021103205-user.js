'use strict';

const data = require("../data/user.json");
const { hashPassword } = require("../helpers/bcrypt");
data.forEach(el => {
  el.createdAt = new Date()
  el.updatedAt = new Date()
  el.password = hashPassword(el.password)
})
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
  return queryInterface.bulkInsert('Users', data,{})
  },

  down: (queryInterface, Sequelize) => {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete('Users',null,{})
  }
};
