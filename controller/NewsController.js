const express = require("express");
const Sequelize = require("sequelize");
const news = require("../models/news");

module.exports.getAllNews = (req, res) => {
  try {
    news.findAll({ raw: true }).then((result) => {
      console.log(result);
    //   res.send({data: result});
    });
  } catch (e) {
    console.log(e);
  }
};
