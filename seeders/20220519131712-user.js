'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id: 1,
      firstName: 'John12',
      lastName: 'Doe12',
      login: 'JohnD',
      password: '789',
      email: 'asdaq@mdsfa.cv',
      createdAt: new Date(),
      updatedAt: new Date(),
    }]);
  },

  async down(queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
