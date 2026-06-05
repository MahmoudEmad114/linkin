const Link = require('../models/link');

exports.getMyLinks = async (req, res) => {
    try {
        const links = await Link.find({
            user: req.user._id
        });

        res.status(200).json({
            status: 'success',
            results: links.length,
            data: {
                links
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getLink = async (req, res) => {
    try {
        const link = await Link.findOne({
            _id: req.params.id,
            user: req.user._id
        });

        res.status(200).json({
            status: 'success',
            data: {
                link
            }
        })
    } catch (err) {
        res.status(404).json({
            status: 'fail',
            message: err
        })
    }
}

exports.createLink = async (req, res) => {
    try {
        const newLink = await Link.create({
            title: req.body.title,
            url: req.body.url,
            user: req.user._id
        }
        );
        res.status(201).json({
            status: 'success',
            data: {
                newLink
            }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err.message
        })
    }
}

exports.deleteLink = async (req, res) => {
    try {
        await Link.findOneAndDelete({
            _id: req.params.id,
            user: req.user._id
        });
        res.status(204).json({
            status: 'success',
            data: null,
            message: 'Link deleted'
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}