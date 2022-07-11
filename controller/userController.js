const fs = require('fs');

const { User, News } = require('../models');

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

      if (picture) {
        const { avatar } = await User.findByPk(id);
        if (avatar) {
          fs.unlink(`${__dirname}/../public/${avatar}`, function (err) {
            if (err) {
              return res
                .status(500)
                .send({ message: `Ошибка ${error.message}! Ошибка замены ` });
            }
          });
        }
        picture.mv(
          `${__dirname}/../public/images/avatar/${id}.${
            picture.name.split('.').slice(-1)[0]
          }`,
          (err) => {
            if (err) {
              return res.status(500).send({
                message: `Ошибка ${error.message}! Ошибка добавления файла `,
              });
            }
          }
        );
        img = `images/avatar/${id}.${picture.name.split('.').slice(-1)[0]}`;
      }

      try {
        const result = await User.update({ avatar: img }, { where: { id } });
        return res.status(200).send({
          message: `Аватар успешно добавлен!`,
        });
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
