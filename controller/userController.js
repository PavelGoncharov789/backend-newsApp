const { News } = require('../models');

module.exports = {
  async getUserData(req, res) {
    const id = req.params.id;
    try {
      const userData = await News.findAll({ where: { author: id } });
      return res.status(200).send(userData);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ошибка при получении данных пользователя.' });
    }
  },
};
