const User = require('../models/user');
const bcrypt = require('bcryptjs');
const generateToken = require('../utils/generateToken');

exports.register = async (req, res) => {
    try {

        const { name, email, password } = req.body;

        const hashedPassword = await bcrypt.hash(password, 12);

        const user = await User.create({
            name,
            email,
            password: hashedPassword
        });

        const token = generateToken(user._id);


        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.redirect('/dashboard');

        // res.status(201).json({
        // status: 'success',
        // token,
        // data: {
        //     user
        // }
        // })
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'fail',
            message: err.message,
            stack: err.stack
        });
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        }

        const isCorrect = await bcrypt.compare(password, user.password);

        if (!isCorrect) {
            return res.status(401).json({
                status: 'fail',
                message: 'Invalid credentials'
            })
        }

        const token = generateToken(user._id);
        res.cookie('jwt', token, {
            httpOnly: true,
            maxAge: 30 * 24 * 60 * 60 * 1000
        });

        res.redirect('/dashboard');

        // res.status(200).json({
        //     status: 'success',
        // })

        // } catch (err) {
        //     res.status(400).json({
        //         status: 'fail',
        //         message: err
        //     })
        // }
    } catch (err) {
        console.log(err);

        res.status(400).json({
            status: 'fail',
            message: err.message,
            stack: err.stack
        });
    }
}

exports.logout = (req, res) => {
    res.cookie('jwt', '', {
        expires: new Date(Date.now() + 1000)
    });

    res.redirect('/login');
}