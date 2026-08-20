const Link = require('../models/linkModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getOverview = (req, res) => {
    res.render('overview');
}

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.getDashboard = catchAsync(async (req, res, next) => {
    const links = await Link.find({
        user: req.user._id
    })
    res.render('dashboard', {
        user: req.user,
        links
    });
});

exports.addLink = catchAsync(async (req, res, next) => {

    await Link.create({
        title: req.body.title,
        url: req.body.url,
        user: req.user._id
    });

    res.redirect('/dashboard');
});

exports.deleteLink = catchAsync(async (req, res, next) => {

    const link = await Link.findOneAndDelete({
        _id: req.params.id,
        user: req.user._id
    });

    if (!link) {
        return next(new AppError('No link found with that ID', 404));
    }

    res.redirect('/dashboard');
});