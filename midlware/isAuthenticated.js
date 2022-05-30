const jwt = require('jsonwebtoken');
const { User } = require('../models');

const { secretKey } = require("../config");

module.exports = {
  async isAuthenticated(req,res,next){
    try{
      const decoded = jwt.verify(req.headers.authorization, secretKey);
      if(!decoded.userId){
        throw new Error('Пользователь не найден совсем');
      }
      const existingUser = await User.findByPk(decoded.userId);
      if(existingUser){
        req.user = existingUser;
        next();
      } else {
        throw new Error('Пользователь не найден');
      }
    } catch (e) {
      console.log(e);
      return res.status(401).send({message: "Пользователь не авторизован! "});
    }
   }
}
