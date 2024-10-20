const express = require('express');
const routes = express.Router();

routes.get('/', (req, res) => {
  res.send('Welcome to the To-Do List App');
});

module.exports = routes;
