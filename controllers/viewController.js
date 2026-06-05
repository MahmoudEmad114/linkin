const Link = require('../models/link');

exports.getLogin = (req, res) => {
    res.render('login');
};

exports.getRegister = (req, res) => {
    res.render('register');
};

exports.getDashboard = async (req, res) => {
    console.log(req.user);
    const links = await Link.find({
        user: req.user._id
    })
    res.render('dashboard', {
        user: req.user,
        links
    });
};