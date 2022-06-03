const { Op } = require('sequelize');
const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { secretKey } = require('../config');

module.exports = {
  async signUp(req, res) {
    try {
      const {
        body: {
          firstName, lastName, login, password, email, avatar,
        },
      } = req;

      const newUser = await User.findOrCreate({
        where: {
          [Op.or]: [{ login }, { email }],
        },
        defaults: {
          firstName,
          lastName,
          login,
          password,
          email,
          avatar,
        },
      });
      const [user, isCreated] = newUser;
      if (isCreated) {
        return res.status(409).send({ message: 'Такой пользователь существует!' });
      }
      return res.status(200).send(user);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ошибка авторизации! Попробуйте снова!' });
    }
  },
  async signIn(req, res) {
    try {
      const {
        body: { login, password },
      } = req;

      const user = await User.findOne({ where: { login } });

      if (!user) {
        return res
          .status(409)
          .send({ message: 'Ошибка! Пользователь не найден!' });
      }

      const isCorrectPassword = await user.comparePassword(password);

      if (!isCorrectPassword) {
        return res.status(409).send({ message: 'Ошибка! Пароль не верный!' });
      }
      const token = jwt.sign({ userId: user.id }, secretKey, { expiresIn: '24h' });
      return res.status(200).send({ token, user });
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка! Попробуйте снова!' });
    }
  },
  async whoAmI(req, res) {
    try {
      return res.status(200).send(req.user);
    } catch (error) {
      return res.status(401).send('Ошибка при попытке авторизации');
    }
  },
};
