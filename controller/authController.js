const { User } = require('../models');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const skey = require('../config');

module.exports = {
  async createUser(req, res) {
    let existingUser = null;
    existingUser = await User.findAll({
      // where: { login: 'test'}
      where: { 
        login: req.body.login, email: req.body.email 
      }
    });
    if(existingUser){ 
      return res.status(409).send({ message: 'Ошибка! Пользователь существует!' });
    }
    try {
      const {
        body: {
          firstName,
          lastName,
          login,
          password,
          email,
          avatar,
        },
      } = req;

      const newUser = await User.create({
        firstName,
        lastName,
        login,
        password,
        email,
        avatar,
      });
      const token = jwt.sign({Ulogin: newUser.login}, skey.sKey, { expiresIn: "24h"} )
      return res.status(200).send({existingUser});
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка! Попробуйте снова!' });
    }
  },
};
