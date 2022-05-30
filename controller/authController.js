const Sequelize = require('sequelize');
const Op = Sequelize.Op;
const { User } = require('../models');
const user = require('../models/user');
const jwt = require('jsonwebtoken');
const { secretKey } = require('../config');
const bcrypt = require('bcrypt');

module.exports = {
  async signUp(req, res) {
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

      const  newUser = await User.findOrCreate({
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
        },
        defaults: {
        firstName,
        lastName,
        login,
        password,
        email,
        avatar,
        }
      });

      return res.status(200).send(newUser);
    } catch (error) {
      return res.status(500).send({ message: `Ошибка ${error}! Попробуйте снова!` });
    }
  },
  async signIn(req, res) {
    try {
      const {
        body: {
          login,
          password,
        },
      } = req;

      const existingUser = await User.findOne({ where: { login } });

      if(!existingUser){ 
        return res.status(409).send({ message: 'Ошибка! Пользователь не найден!' });
      };

      const isPass = await bcrypt.compare(password, existingUser.password);

      if(!isPass){
        return res.status(409).send({ message: 'Ошибка! Пароль не верный!' })
    }

      const token = jwt.sign({userId: existingUser.id}, secretKey, { expiresIn: "24h"} );
      return res.status(200).send({ token, user: existingUser });
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка! Попробуйте снова!' });
    }
  },
  async whoAmI(req, res, next){
    try{
      return res.status(200).send(req.user);
    } catch (e) {
      console.log(e)
    }
   },
};
