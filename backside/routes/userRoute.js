const express = require('express');
const userControllers = require('../controllers/usersController');

const router = express.Router();

router.post('/', userControllers.createUser);
router.get('/', userControllers.getUsers);
router.get('/:id', userControllers.getUserById);
router.put('/:id', userControllers.updateUserData);
router.delete('/:id', userControllers.deleteUser);

module.exports = router;
