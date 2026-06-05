const express = require('express');

const router = express.Router();

const Link = require('../models/link');

const authMiddleware = require('../middleware/authMiddleware');

router.use(authMiddleware.protect);

router.post('/add', async (req, res) => {

    await Link.create({

        title: req.body.title,

        url: req.body.url,

        user: req.user._id

    });

    res.redirect('/dashboard');

});

router.post('/delete/:id', async (req, res) => {

    await Link.findOneAndDelete({

        _id: req.params.id,

        user: req.user._id

    });

    res.redirect('/dashboard');

});

module.exports = router;