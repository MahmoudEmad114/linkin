const Link = require('../models/linkModel');
const APIFeatures = require('../utils/apiFeatures');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');


exports.getMyLinks = catchAsync(async (req, res, next) => {
    const features = new APIFeatures(Link.find({
        user: req.user._id
    }), req.query).paginate();

    const links = await features.query;


    res.status(200).json({
        status: 'success',
        results: links.length,
        data: {
            links
        }
    })
})

exports.createLink = catchAsync(async (req, res, next) => {
    const newLink = await Link.create({
        title: req.body.title,
        url: req.body.url,
        user: req.user._id
    })

    res.status(201).json({
        status: 'success',
        data: {
            link: newLink
        }
    })
})

exports.deleteLink = catchAsync(async (req, res, next) => {
    const link = await Link.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    })

    if (!link) {
        return next(new AppError('No link found with that ID', 404));
    }

    res.status(204).json({
        status: 'success',
        data: null,
    })
})