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
  async addAvatar(req,res) {
    try {
      const { user: { id } } = req;

      let img = null;
      const picture = req?.files?.file;
      
      if (picture) {
        const random = Date.now();
        // picture.mv(`${__dirname}/../public/images/news/${random}_${picture.name}`, (err) => {
        //   if (err) {
        //     throw new Error({ message: 'Ошибка при добавлении изображеня!' });
        //   }
        // });
        // img = `images/news/${random}_${picture.name}`;
      }


    } catch (error) {
      return res
        .status(500)
        .send({
          message: `Ошибка ${error.message}! Невозможно добавить Аватар`,
        });
    }
  }
};
