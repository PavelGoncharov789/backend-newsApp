const express = require('express');
const Sequelize = require('sequelize');

const { News, User } = require('../models');

module.exports = {
  async selectAll(req, res) {
    res.set('Access-Control-Allow-Origin', '*');
    News.findAll({ include: [{ model: User, as: 'users', attributes: ['id', 'login'] }] }).then((result) => {
      res.status(200).send(result);
    })
      .catch((err) => { res.send(500); });
  },
};
