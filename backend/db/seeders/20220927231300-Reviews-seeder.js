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
    await queryInterface.bulkInsert('Reviews', [
      {
        spotId: 1,
        userId: 1,
        review: 'This is review 1',
        stars: 5
      },
      {
        spotId: 1,
        userId: 1,
        review: 'This another test review',
        stars: 3
      },
      {
        spotId: 1,
        userId: 1,
        review: 'This another test review',
        stars: 2
      },
      {
        spotId: 2,
        userId: 2,
        review: 'This is review 2',
        stars: 3
      },
      {
        spotId: 3,
        userId: 3,
        review: 'This is review 3',
        stars: 1
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
    await queryInterface.bulkDelete('Reviews', {
      id:[1,2,3]
    })
  }
};
