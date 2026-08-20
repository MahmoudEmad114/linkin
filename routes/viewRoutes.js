const express = require('express');

const router = express.Router();

const viewController = require('../controllers/viewController');

const authController = require('../controllers/authController');

router.get('/', viewController.getOverview);


router
    .route('/login')
    .get(viewController.getLogin);

router
    .route('/register')
    .get(viewController.getRegister);

router
    .route('/dashboard')
    .get(authController.protect, viewController.getDashboard);

router
    .post(
        '/links/add',
        authController.protect,
        viewController.addLink
    );

router
    .post(
        '/links/delete/:id',
        authController.protect,
        viewController.deleteLink
    );

module.exports = router;