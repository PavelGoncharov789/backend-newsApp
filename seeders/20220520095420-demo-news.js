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

new Promise(function test(resolve, reject) {

  setTimeout(() => resolve(console.log(`1 sec`)), 1000);
  test()

}).then(function() {
  return new Promise((resolve, reject) => { // (*)
    setTimeout(() => resolve(console.log(`2 sec`)), 1000);
  });

}).then(function() {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(console.log(`3 sec`)), 1000);
  }); 
})

const printSec = (number = 1) => {
  if (number>4) {
    new Promise(function test(resolve, reject) {
      setTimeout(() => resolve(console.log(`1 sec`)), 1000);
    })
    printSec(number+1)
  }

}