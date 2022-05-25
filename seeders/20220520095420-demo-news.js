module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('news', [{
      id: 1,
      author: 1,
      title: 'Doe12',
      text: 'JohnD',
      tags: '789',
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('news', null, {});
  }
};
