const { Router } = require('express');
const userController = require('../controllers/users.js');
const jwtMiddleware = require('../middleware/jwtMiddleware');
const router = Router();

// Registration route
router.post('/register', userController.registerUser);

// Login user route
router.post('/login', userController.loginUser);

// CRUD operations
router.post('/', userController.createUser); // Create a new user
router.get('/', userController.getAllUsers); // Get all users
router.get('/:id', userController.getUserById); // Get user by ID
router.put('/:id', userController.updateUser); // Update user by ID
router.delete('/:id', userController.deleteUser); // Delete user by ID

// Protected route example (fetch user profile)
router.get('/profile', jwtMiddleware, userController.getUserProfile);

module.exports = router;
