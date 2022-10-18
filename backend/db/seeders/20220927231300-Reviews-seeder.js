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
        userId: 2,
        review: 'I had a fantastic time, the space was beautiful. To make things better my children were in distress as there was a no wifi. I would give this place 10 stars if I could.',
        stars: 5
      },
      {
        spotId: 1,
        userId: 3,
        review: 'I was confused by the tiny couch. I wanted to sit in is as I love the color purple. Instead I had to walk outside which is a big no. Did you know there are mosquitoes around the space. Please fix this for the next person.',
        stars: 2
      },
      {
        spotId: 2,
        userId: 3,
        review: 'This was a very tiny home! The cat was lovely, but I tried to move the couch and it scratched me.',
        stars: 5
      },
      {
        spotId: 3,
        userId: 1,
        review: 'I walked into the glass window...',
        stars: 1
      },
      {
        spotId: 3,
        userId: 4,
        review: 'Heard some people have walked into the glass window from the owner. I thought it was a joke but then I read some of the other reviews. Has me dying, this place is great.',
        stars: 5
      },
      {
        spotId: 4,
        userId: 4,
        review: 'Im on a Boat!!!',
        stars: 5
      },
      {
        spotId: 5,
        userId: 6,
        review: 'This was a house. There was a lake.',
        stars: 3
      },
      {
        spotId: 6,
        userId: 6,
        review: 'If your choosing between a barn or a lake choose the barn. I cant swim.',
        stars: 4
      },
      {
        spotId: 7,
        userId: 2,
        review: 'Waiting for Gandalf. I will never leave.',
        stars: 5
      },
      {
        spotId: 8,
        userId: 3,
        review: "This house is too big. I brought my kids and they got lost. I couldn't find them by checkout, so whoever finds them can have them.",
        stars: 2
      },
      {
        spotId: 9,
        userId: 1,
        review: "I'm having my wife write this because I cant read. Why is this house so pointy? Reminds me of something and she keeps telling me it's an A. I ask her it's a what? She yells at me and I'm not sure why.",
        stars: 1
      },
      {
        spotId: 9,
        userId: 4,
        review: 'A hopuse that looks like the letter A. very cool',
        stars: 4
      },
      {
        spotId: 10,
        userId: 6,
        review: "I found a bear. It didn't like me. On the plus side there was a cat with a vacuum, cool guy.",
        stars: 5
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
