const express = require('express');

const router = express.Router();

const viewController = require('../controllers/viewController');

const authMiddleware = require('../middleware/authMiddleware');


router
    .route('/login')
    .get(viewController.getLogin);

router
    .route('/register')
    .get(viewController.getRegister);

router
    .route('/dashboard')
    .get(authMiddleware.protect, viewController.getDashboard);

module.exports = router;