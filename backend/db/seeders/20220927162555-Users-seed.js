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
        firstName: 'Agent',
        lastName: 'Smith',
        username: 'Night Hawk',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'fake1@email.io'
      },
      {
        firstName: 'Stew',
        lastName: 'Man',
        username: 'Dragon',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'fake2@email.io'
      },
      {
        firstName: 'Explore',
        lastName: 'Goodness',
        username: 'hummingbird',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'fake3@email.io'
      },
      {
        firstName: 'Mr',
        lastName: 'Spaghetti',
        username: 'findmeacouch',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'fake4@email.io'
      },
      {
        firstName: 'John',
        lastName: 'Doe',
        username: 'johnythedoe',
        hashedPassword: bcrypt.hashSync('password'),
        email: 'fake5@email.io'
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
