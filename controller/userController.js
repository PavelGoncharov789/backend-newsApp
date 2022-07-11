const { User, News } = require('../models');
const fs = require('fs');
const { log } = require('console');

module.exports = {
  async getUserData(req, res) {
    const { id } = req.params;
    try {
      const userData = await User.findOne({
        where: { id },
        include: [
          {
            model: News,
            as: 'news',
          },
        ],
      });
      return res.status(200).send(userData);
    } catch (error) {
      return res
        .status(500)
        .send({ message: 'Ошибка при получении данных пользователя.' });
    }
  },
  async addAvatar(req, res) {
    try {
      const {
        user: { id },
      } = req;

      let img = null;
      const picture = req?.files?.file;

      const editableUser = await User.findAll({
        where: {
          id,
        },
      });

      if (picture) {
        if (editableUser[0].dataValues.avatar) {
          fs.unlink(
            `${__dirname}/../public/${editableUser[0].dataValues.avatar}`,
            function (err) {
              if (err) {
                return res
                  .status(500)
                  .send({ message: `Ошибка ${error.message}! Ошибка замены ` });
              }
            }
          );
        }
        picture.mv(
          `${__dirname}/../public/images/avatar/${id}.${
            picture.name.split('.').slice(-1)[0]
          }`,
          (err) => {
            if (err) {
              return res
                .status(500)
                .send({
                  message: `Ошибка ${error.message}! Ошибка добавления файла `,
                });
            }
          }
        );
        img = `images/avatar/${id}.${picture.name.split('.').slice(-1)[0]}`;
      }

      try {
        const result = await User.update({ avatar: img }, { where: { id } });
      } catch (err) {
        return res
          .status(500)
          .send({ message: `Ошибка ${error.message}! Ошибка базы данных!` });
      }
    } catch (error) {
      return res.status(500).send({
        message: `Ошибка ${error.message}! Невозможно добавить Аватар`,
      });
    }
  },
};
