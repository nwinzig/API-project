'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('SpotImages', [
      {
        spotId: 1,
        url: 'demoSpot1 url',
        preview: false
      },
      {
        spotId: 2,
        url: 'demoSpot2 url',
        preview: true
      },
      {
        spotId: 3,
        url: 'demoSpot3 url',
        preview: true
      },
    ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */

    await queryInterface.bulkDelete('SpotImages', {
      url: ['demoSpot1 url', 'demoSpot2 url', 'demoSpot3 url']
    })
  }
};
