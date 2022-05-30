const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const sKey = require("../config")

module.exports = {
  async tokenUser(req,res){
    try{
      const decoded = jwt.verify(req.headers.authorization, sKey.sKey);
    } catch (e) {
      console.log(e)
    }
   }
}
