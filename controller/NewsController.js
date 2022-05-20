const express = require("express");
const Sequelize = require("sequelize");
const { News, User } = require("../models");

// module.exports.getAllNews = (req, res) => {
//   try {
// News.findAll({ raw: true }).then((result) => {
//   console.log(result);
//   res.send({data: result});
//     });
//   } catch (e) {
//     console.log(e);
//   }
// };

module.exports = {
  async selectAll(req, res) {
    News.findAll({ include:[{model: User, as: 'users', attributes:['id','login']}] }).then((result) => {
      res.status(200).send({ data: result });
    })
    .catch((err) =>{console.log(err); res.send(500);})  
  },
};
