const express = require('express');
const linkController = require('../controllers/linkController');
const authController = require('../controllers/authController');


const router = express.Router();
router.use(authController.protect)

router
    .route('/')
    .post(linkController.createLink)
    .get(linkController.getMyLinks);

router
    .route('/:id')
    .delete(linkController.deleteLink);

module.exports = router;    
