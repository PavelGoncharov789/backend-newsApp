const jwt = require('jsonwebtoken');

const { User } = require('../models');
const { secretKey } = require('../config');

module.exports = {
  async isAuthenticated(req, res, next) {
    try {
      const token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, secretKey);
      const { userId } = decoded;
      if (userId == null && userId === '') {
        throw new Error('Пользователь не авторизован! Ошибка авторизации!');
      }
      const user = await User.findByPk(userId);
      if (!user) {
        throw new Error('Пользователь не найден');
      }
      req.user = user;
      return next();
    } catch (error) {
      return res.status(401).send({ message: 'Пользователь не авторизован!' });
    }
  },
};
