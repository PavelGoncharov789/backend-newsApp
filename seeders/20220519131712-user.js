module.exports = {
  async up(queryInterface) {
    return queryInterface.bulkInsert('Users', [{
      firstName: 'John12',
      lastName: 'Doe12',
      login: 'JohnD',
      password: '789',
      email: 'asdaq@mdsfa.cv',
    }]);
  },

  async down(queryInterface) {
    return queryInterface.bulkDelete('Users', null, {});
  },
};
