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
          ownerId: 1,
          address: '1 Fernhill Leaze',
          city: 'Murdo',
          state: 'South Dekota',
          country: 'United States',
          lat: 1.1,
          lng: 1.1,
          name: 'Going on a pilgrimage',
          description: "This lovely spot will make you feel like your finding new land. Enjoy the outdoors... please don't sit on your phones all day.",
          price: 11.11,
        },
        {
          ownerId: 1,
          address: '2 Langley Road',
          city: 'Linneus',
          state: 'Missouri',
          country: 'United States',
          lat: 2.2,
          lng: 2.2,
          name: 'A tiny tiny home',
          description: 'Enjoy this tiny home. It may be small but makes up for it in personality. Our cat comes and goes, just dont move the couch.',
          price: 121.11,
        },
        {
          ownerId: 2,
          address: '3 Dros Y Mor',
          city: 'Alpine',
          state: 'Utah',
          country: 'United States',
          lat: 3.3,
          lng: 3.3,
          name: 'Mirror House',
          description: 'Is this a mirror or a house? Who knows? Find out for yourself and enjoy the spectacular view.',
          price: 122.22,
        },
        {
          ownerId: 2,
          address: '4 Bakers Elms',
          city: 'Bunker Hill',
          state: 'Oregon',
          country: 'United States',
          lat: 4.4,
          lng: 4.4,
          name: 'Living Aground',
          description: 'Oh wait a boat. Were not sure how it got here but we love it and so will you.',
          price: 212.12,
        },
        {
          ownerId: 3,
          address: '5 Griffin Fold',
          city: 'Germantown',
          state: 'Tennessee',
          country: 'United States',
          lat: 5.5,
          lng: 5.5,
          name: 'Lake House',
          description: 'Just your generic lake house. Stay here if you want. You have a lake and a house.',
          price: 343.23,
        },
        {
          ownerId: 3,
          address: '6 Cecil Lawn',
          city: 'Pebble Creek',
          state: 'Florida',
          country: 'United States',
          lat: 6.6,
          lng: 6.6,
          name: 'Barn House',
          description: 'Better than a lake house. Stay in a barn we even cleaned it out for you.',
          price: 133.33,
        },
        {
          ownerId: 4,
          address: '7 Foxes Pleasant',
          city: 'Livingston',
          state: 'Montana',
          country: 'United States',
          lat: 7.7,
          lng: 7.7,
          name: 'Hobbit hole',
          description: 'Are you really a hobbit? If you wanna find out take a quick stay at our little hobbit-hole.',
          price: 464.94,
        },
        {
          ownerId: 4,
          address: '8 Sackville Green',
          city: 'Northwood',
          state: 'Ohio',
          country: 'United States',
          lat: 8.8,
          lng: 8.8,
          name: 'Big Ol House',
          description: "Yup this is a big house. You'll have a pool and more rooms than anyone needs. Perfect for a group stay or just come and ball out.",
          price: 1124.64,
        },
        {
          ownerId: 5,
          address: '9 Kirkstone Leys',
          city: 'Desert Edge',
          state: 'California',
          country: 'United States',
          lat: 9.9,
          lng: 9.9,
          name: 'A for A house',
          description: 'This house looks like a letter from the alphabet. Can you guess what it is?',
          price: 234.44,
        },
        {
          ownerId: 5,
          address: '10 All Saints Meadows',
          city: 'Fulton',
          state: 'New York',
          country: 'United States',
          lat: 10.10,
          lng: 10.10,
          name: 'Treehouse',
          description: 'Trying to be a kid again. Come stay in our treehouse. Play with some imaginary friends or find some bears. You wont even have to clean.',
          price: 657.44,
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
