const { User, News } = require('../models');

module.exports = {
  async getUserData(req, res) {
    const { id } = req.params;
    try {
      const userData = await User.findOne(
        {
          where: { id },
          include: [{
            model: News,
            as: 'news',
          }],
        },
      );
      return res.status(200).send(userData);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ошибка при получении данных пользователя.' });
    }
  },
  async addNews(req, res) {
    try {
      const {
        body: {
          title, text, author, tags,
        },
      } = req;

      News.create(
        {
          title,
          text,
          author,
          tags,
        },
      );
      return res.status(200).send({ message: 'Новость успешно добавлена!' });
    } catch (errr) {
      return res
        .status(501)
        .send({ message: 'Невозможно добавить материал' });
    }
  },
};
