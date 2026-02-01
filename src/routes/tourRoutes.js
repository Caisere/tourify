// Core Modules
const express = require('express');

// Import controller functions
const {getAllTours, getTourById, createTour, updateTour, deleteTour, checkID} = require('../controllers/tourControllers');

const router = express.Router()

// Middleware to check ID validity
router.param('id', checkID)

// Route definitions
router
    .route('/')
    .get(getAllTours)
    .post(createTour)

router
    .route('/:id')
    .get(getTourById)
    .patch(updateTour)
    .delete(deleteTour)
    
    
// Export the router
module.exports = router;
