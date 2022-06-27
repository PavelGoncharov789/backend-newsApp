const { News, User } = require('../models');

module.exports = {
  async selectAll(req, res) {
    try {
      const newsList = await News.findAll({
        include: [
          {
            model: User,
            as: 'author',
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
        user: { id: authorId },
      } = req;

      if (title === '' || title == null || text === '' || text == null) {
        throw new Error('Обязательное поле не заполненно!');
      }
      let img = null;
      const picture = req?.files?.file;

      if (picture) {
        const random = Math.random() / Date.now();
        picture.mv(`${__dirname}/../public/images/news/${random}_${picture.name}`, (err) => {
          if (err) {
            throw new Error({ message: 'Ошибка при добавлении изображеня!' });
          }
        });
        img = `images/news/${random}_${picture.name}`;
      }

      const newNews = await News.create({
        title,
        text,
        authorId,
        tags,
        img,
      });
      return res.status(201).send({
        message: `Новость ${newNews.dataValues.title} успешно добавлена!`,
      });
    } catch (error) {
      return res
        .status(500)
        .send({
          message: `Ошибка ${error.message}! Невозможно добавить материал`,
        });
    }
  },
};
