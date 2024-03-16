const express = require('express');
const userControllers = require('../controllers/usersController');

const router = express.Router();

router.post('/', userControllers.postNew);

module.exports = router;
