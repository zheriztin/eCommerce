'use strict';
const fs = require("fs")
const { hashPassword } = require('../helpers/bcrypt')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = JSON.parse(fs.readFileSync("./data/user.json", "utf-8"))
    data.forEach(el => {
      el.createdAt = new Date ()
      el.updatedAt = new Date ()
      el.password = hashPassword(el.password)
    })
    return queryInterface.bulkInsert('Users', data, {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Users', null, {});
  }
};
