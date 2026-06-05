const express = require('express');
const linkController = require('../controllers/linkController');
const authMiddleware = require('../middleware/authMiddleware');


const router = express.Router();
router.use(authMiddleware.protect)

router
    .route('/')
    .post(linkController.createLink)
    .get(linkController.getMyLinks);

router
    .route('/:id')
    .get(linkController.getLink)
    .delete(linkController.deleteLink);


module.exports = router;    
