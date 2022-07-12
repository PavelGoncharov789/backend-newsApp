module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('users', [{
      firstName: 'John12',
      lastName: 'Doe12',
      login: 'JohnD',
      password: '789',
      email: 'asdaq@mdsfa.cv',
      createdAt:new Date(),
      updatedAt:new Date(),
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('users', null, {});
  },
};
