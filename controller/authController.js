const { User } = require('../models');

module.exports = {
  async createUser(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
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
      return res.status(200).send({ message: ` Пользователь ${newUser.login} создан!` });
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка! Попробуйте снова!' });
    }
  },
};
