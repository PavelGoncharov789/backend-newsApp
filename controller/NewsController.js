const { News, User } = require('../models');

module.exports = {
  async selectAll(req, res) {
    try {
      const newsList = await News.findAll({
        include: [{
          model: User,
          as: 'users',
          attributes: ['id', 'login'],
        }],
      });
      return res.status(200).send(newsList);
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка!' });
    }
  },
};
