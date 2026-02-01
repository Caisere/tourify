// Core Modules
const express = require('express');

// Import controller functions
const {getAllUsers, getUserById, createUser, updateUser, deleteUser} = require('../controllers/userControllers');

// Create a new router instance
const router = express.Router();

// Route definitions
router
    .route('/')
    .get(getAllUsers)
    .post(createUser);

router
    .route('/:id')
    .get(getUserById)
    .patch(updateUser)
    .delete(deleteUser);


// Export the router
module.exports = router;