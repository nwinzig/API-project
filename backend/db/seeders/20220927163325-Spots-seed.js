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
      await queryInterface.bulkInsert('Spots', [
        {
          ownerId: 4,
          address: 'address1',
          city: 'city1',
          state: 'state1',
          country: 'country1',
          lat: 1.1,
          lng: 1.1,
          name: 'spot1',
          description: 'this spot is first',
          price: 11.11,
        },
        {
          ownerId: 4,
          address: 'address2',
          city: 'city2',
          state: 'state2',
          country: 'country2',
          lat: 2.2,
          lng: 2.2,
          name: 'spot2',
          description: 'this spot is second',
          price: 22.22,
        },
        {
          ownerId: 5,
          address: 'address3',
          city: 'city3',
          state: 'state3',
          country: 'country3',
          lat: 3.3,
          lng: 3.3,
          name: 'spot3',
          description: 'this spot is third',
          price: 33.33,
        },
        {
          ownerId: 6,
          address: 'address4',
          city: 'city4',
          state: 'state4',
          country: 'country4',
          lat: 4.4,
          lng: 4.4,
          name: 'spot4',
          description: 'this spot is fourth',
          price: 44.44,
        }
      ])
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('Spots', {
      name: ['spot1', 'spot2', 'spo3', 'spot4']
    })
  }
};
