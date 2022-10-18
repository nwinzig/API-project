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
        url: 'https://asset.cloudinary.com/dydhvazpw/23b967317295592039d17c4a24cef652',
        preview: true
      },
      {
        spotId: 1,
        url: 'https://asset.cloudinary.com/dydhvazpw/4f139d158794faa7acc54f91a5e9dc7f',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://asset.cloudinary.com/dydhvazpw/6b34d75abd49f1a7b58877eacf81e249',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://asset.cloudinary.com/dydhvazpw/c213a6d959a492575894f930f514558a',
        preview: false
      },
      {
        spotId: 1,
        url: 'https://asset.cloudinary.com/dydhvazpw/d6cabfc41579a33db00354610aa0f893',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://asset.cloudinary.com/dydhvazpw/3ca7867d82da65c1f33ba6162074b7d0',
        preview: true
      },
      {
        spotId: 2,
        url: 'https://asset.cloudinary.com/dydhvazpw/c8f76cbf3c5647fab398f2a42809f48a',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://asset.cloudinary.com/dydhvazpw/622a4bab56a956fc55762ac65de1ae5a',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://asset.cloudinary.com/dydhvazpw/df6b3b3aff7403b9f60de7d1c1b989e4',
        preview: false
      },
      {
        spotId: 2,
        url: 'https://asset.cloudinary.com/dydhvazpw/fcdfd111a38ca1f09dac972985db360b',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://asset.cloudinary.com/dydhvazpw/8ba0d3de75cdff977a010112034b34c1',
        preview: true
      },
      {
        spotId: 3,
        url: 'https://asset.cloudinary.com/dydhvazpw/44904a211120ae9bdddb42d66899433b',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://asset.cloudinary.com/dydhvazpw/e55c9c081259f51a90dfc1db06fe4e23',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://asset.cloudinary.com/dydhvazpw/e0be4fca8d8bffc5c93bb16003386977',
        preview: false
      },
      {
        spotId: 3,
        url: 'https://asset.cloudinary.com/dydhvazpw/9e431ba8480b5022ed697303259f62c9',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://asset.cloudinary.com/dydhvazpw/b7c9e76ad9c78ba48d994a4bac93e157',
        preview: true
      },
      {
        spotId: 4,
        url: 'https://asset.cloudinary.com/dydhvazpw/281810d9a9c114b20c49123e96f25895',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://asset.cloudinary.com/dydhvazpw/2849f7a77477f515678dd612433ab458',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://asset.cloudinary.com/dydhvazpw/6ab093ec010840f634d5a44c5e21a948',
        preview: false
      },
      {
        spotId: 4,
        url: 'https://asset.cloudinary.com/dydhvazpw/fb68d68fbfd51f0c58644214d4f6e72a',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://asset.cloudinary.com/dydhvazpw/3e29423e37423997d8d0ac5666dee620',
        preview: true
      },
      {
        spotId: 5,
        url: 'https://asset.cloudinary.com/dydhvazpw/d0b3f136ed11551f836a9bb1ee2fb312',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://asset.cloudinary.com/dydhvazpw/1e79a09a5667c643e1e598f43567e4db',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://asset.cloudinary.com/dydhvazpw/aa7aaba988ba75f16d005203958b1c06',
        preview: false
      },
      {
        spotId: 5,
        url: 'https://asset.cloudinary.com/dydhvazpw/4bf90623d02df9aba81dbaffe410ed83',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://asset.cloudinary.com/dydhvazpw/0a2b4aadc6ac8c79186a5385e936b337',
        preview: true
      },
      {
        spotId: 6,
        url: 'https://asset.cloudinary.com/dydhvazpw/195615c6cdee8d0621d6cc8e5a6cd97d',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://asset.cloudinary.com/dydhvazpw/691264e7e2593c4db1bb11e6b157385c',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://asset.cloudinary.com/dydhvazpw/a6f41d9acb81432d3bf9c737dd6eb91c',
        preview: false
      },
      {
        spotId: 6,
        url: 'https://asset.cloudinary.com/dydhvazpw/51fe7d8d34eef10d0c77b6bd049f9d36',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://asset.cloudinary.com/dydhvazpw/d9ae0e95162060d02a33ed551d952ac9',
        preview: true
      },
      {
        spotId: 7,
        url: 'https://asset.cloudinary.com/dydhvazpw/7de7225d7922a4f1b8d2be5908efae8c',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://asset.cloudinary.com/dydhvazpw/3df3e5602e4d9ba1ec5e34830d944c20',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://asset.cloudinary.com/dydhvazpw/ed8e9f7059ba0d066fb85b2cc5f2a924',
        preview: false
      },
      {
        spotId: 7,
        url: 'https://asset.cloudinary.com/dydhvazpw/69b2355adbca66d21ed39b494d910faf',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://asset.cloudinary.com/dydhvazpw/ad705f1fc70e7701febff2e04053da9c',
        preview: true
      },
      {
        spotId: 8,
        url: 'https://asset.cloudinary.com/dydhvazpw/b8e1bc0fe9c660b089f85c24c5362cd9',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://asset.cloudinary.com/dydhvazpw/e6a2cdea2912b6faa60e8a9c5fd6c4a9',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://asset.cloudinary.com/dydhvazpw/7b99d8fef612f233eb1aa88923d6152c',
        preview: false
      },
      {
        spotId: 8,
        url: 'https://asset.cloudinary.com/dydhvazpw/e86faa10a10b1b38dec58193c4352f03',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://asset.cloudinary.com/dydhvazpw/b9d208e9ddda5eca0b96d633154b02fa',
        preview: true
      },
      {
        spotId: 9,
        url: 'https://asset.cloudinary.com/dydhvazpw/c3da365e72c0982402a6a3d320ace895',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://asset.cloudinary.com/dydhvazpw/300b6ab3b79be84fef7729e95242ce20',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://asset.cloudinary.com/dydhvazpw/2bcb597ad090152533c86e484577b220',
        preview: false
      },
      {
        spotId: 9,
        url: 'https://asset.cloudinary.com/dydhvazpw/33dbcf146372b3536809666afc4938ce',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://asset.cloudinary.com/dydhvazpw/6c7e78b414690daf2e5faed9badcba21',
        preview: true
      },
      {
        spotId: 10,
        url: 'https://asset.cloudinary.com/dydhvazpw/2aeea0c42ca43d9e7c8fc1b74eb6205f',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://asset.cloudinary.com/dydhvazpw/dcf5739cbd06d9ab386aff5e42579616',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://asset.cloudinary.com/dydhvazpw/4319ab04e47319a3384092f9a653911a',
        preview: false
      },
      {
        spotId: 10,
        url: 'https://asset.cloudinary.com/dydhvazpw/b0cdea0c1f7d1b7e9834926d73ebc7b9',
        preview: false
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
