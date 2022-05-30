const { User } = require('../models');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const skey = require('../config');

module.exports = {
  async loginUser(req, res) {
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

      const token = jwt.sign({Ulogin: existingUser.login}, skey.sKey, { expiresIn: "24h"} );
      return res.status(200).send({ token, user: existingUser });
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка! Попробуйте снова!' });
    }
  },
};
