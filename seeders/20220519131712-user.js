'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    return queryInterface.bulkInsert('users', [{
      id:"123",
      firstName: 'John',
      lastName: 'Doe',
      login: "JohnD",
      password: "12345",
      email: 'example@example.com',
      createdAt:"13:21",
      updatedAt:"13:24,
    }]);
  },

  async down (queryInterface, Sequelize) {
    return queryInterface.bulkDelete('users', null, {});
  }
};
