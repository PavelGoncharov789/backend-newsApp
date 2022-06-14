const { News, User } = require('../models');

module.exports = {
  async selectAll(req, res) {
    try {
      const newsList = await News.findAll({
        include: [
          {
            model: User,
            as: 'users',
            attributes: ['id', 'login'],
          },
        ],
      });

      return res.status(200).send(newsList);
    } catch (error) {
      return res.status(500).send({ message: 'Ошибка!' });
    }
  },
  async addNews(req, res) {
    try {
      const {
        body: { title, text, tags },
      } = req;

      const {
        dataValues: { id },
      } = req.user;
      if (title === '' || title === null || text === '' || text === null) {
        throw new Error('Обязательное поле не заполненно!');
      }
      const newNews = News.create({
        title,
        text,
        id,
        tags,
      });
      newNews.then((result) => res.status(201)
        .send({
          message: `Новость ${result.dataValues.title} успешно добавлена!`,
        }));
    } catch (errr) {
      return res.status(501).send({ message: 'Невозможно добавить материал' });
    }
  },
};
