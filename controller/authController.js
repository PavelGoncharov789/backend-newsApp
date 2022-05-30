const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const skey = require('../config');

module.exports = {
  async createUser(req, res) {
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

      const  existingUser = await User.findAll({
        where: { 
          [Op.or]:[
            {
             login:{
                [Op.like]: login,
              }
            },
            {
              email:{
                [Op.like]: email
              }
            }
          ]
        }
      });

      if(existingUser.length){ 
        return res.status(409).send({ message: 'Ошибка! Пользователь существует!' });
      }

      const newUser = await User.create({
        firstName,
        lastName,
        login,
        password,
        email,
        avatar,
      });

      const token = jwt.sign({Ulogin: newUser.login}, skey.sKey, { expiresIn: "24h"} )
      return res.status(200).send({token});
    } catch (error) {
      return res.status(500).send({ message: `Ошибка ${error}! Попробуйте снова!` });
    }
  },
};
