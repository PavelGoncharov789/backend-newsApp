const Sequelize = require('sequelize');

const sequelize = new Sequelize(
  'store',
  'newuser',
  'password',
  {
    dialect: 'postgres',
  },
);

sequelize
  .authenticate()
  .then(() => console.log('Connected.'))
  .catch((err) => console.error('Connection error: ', err));
