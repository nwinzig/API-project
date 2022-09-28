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
    await queryInterface.bulkInsert('Bookings', [
      {
        spotId: 1,
        userId: 1,
        startDate: '2021-11-20 10:00:00',
        endDate: '2021-11-22 11:00:00'
      },
      {
        spotId: 2,
        userId: 2,
        startDate: '2021-10-02 10:00:00',
        endDate: '2021-10-12 12:00:00'
      },
      {
        spotId: 3,
        userId: 3,
        startDate: '2022-03-20 10:00:00',
        endDate: '2022-03-23 13:00:00'
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
    await queryInterface.bulkDelete('Bookings', {
      id: [1, 2, 3]
    })
  }
};
