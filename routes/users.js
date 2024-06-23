
const { Router } = require('express');
const userController = require('../controllers/users.js');
const router = Router();

router.post('/', userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:id', userController.getUserById);

router.put('/:id', userController.updateUser);

router.delete('/:id', userController.deleteUser);

module.exports = router;