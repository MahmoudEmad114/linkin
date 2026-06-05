const express = require('express');
const authController = require('../controllers/authController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router
    .route('/register')
    .post(authController.register);


router
    .route('/login')
    .post(authController.login);

router
    .route('/me')
    .get(authMiddleware.protect, (req, res) => {
        res.status(200).json({
            user: req.user
        })
    })

router.get('/logout', authController.logout);

module.exports = router;

