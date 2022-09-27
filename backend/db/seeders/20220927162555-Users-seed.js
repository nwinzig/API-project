'use strict';

const { HostNotReachableError } = require("sequelize");

const bcrypt = require('bcryptjs');
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('Users', [
      {
        firstName: 'Noah',
        lastName: 'Winzig',
        username: 'Night Hawk',
        hashedPassword: bcrypt.hashSync('nighthawk1'),
        email: 'fakeUserEmail1@email.io'
      },
      {
        firstName: 'Noah2',
        lastName: 'Winzig2',
        username: 'Dragon',
        hashedPassword: bcrypt.hashSync('dragon1'),
        email: 'fakeUserEmail2@email.io'
      },
      {
        firstName: 'Noah3',
        lastName: 'Winzig3',
        username: 'hummingbird',
        hashedPassword: bcrypt.hashSync('hummingbird1'),
        email: 'fakeUserEmail3@email.io'
      }
    ])
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Users',{
        firstName: ['Noah', 'Noah2', 'Noah3' ]
    } )
  }
};
