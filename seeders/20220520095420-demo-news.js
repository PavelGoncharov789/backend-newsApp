module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('News', [{
      id: 1,
      authorId: 1,
      title: 'Doe12',
      text: 'JohnD',
      tags: '789',
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('News', null, {});
  },
};
