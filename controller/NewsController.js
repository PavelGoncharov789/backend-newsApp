const { News, User } = require('../models');
const fs = require('fs');

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

      if (req?.files?.picture) {
        picture.mv(`${__dirname}/../public/images/news/${picture.name}`, err => {
          if (err) {
            throw new Error('Ошибка при добавлении изображеня!');
          } } )
        img = `${__dirname}/../public/images/news/${picture.name}`;
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
