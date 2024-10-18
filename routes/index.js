const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
  res.send('Welcome to the To-Do List App');
});

module.exports = router;
