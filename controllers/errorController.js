const AppError = require("./../utils/appError");

const handleCastErrorDB = err => {
    const message = `Invalid ${err.path}: ${err.value}.`;
    return new AppError(message, 400);
};

const handleDuplicateFieldsDB = err => {
    const value = Object.values(err.keyValue)[0];

    const message = `Duplicate field value: ${value}. Please use another value!`;

    return new AppError(message, 400);
};

const handleValidationErrorDB = err => {
    const errors = Object.values(err.errors).map(el => el.message);

    const message = `Invalid input data. ${errors.join('. ')}`;

    return new AppError(message, 400);
};

const handleJWTError = () => new AppError('Invalid token. Please log in again!', 401);

const handleJWTExpiredError = () => new AppError('Your token has expired! Please log in again.', 401);



const sendErrorDev = (err, req, res) => {

    // LOGIN ERROR
    if (req.originalUrl === '/api/v1/auth/login') {
        return res.status(err.statusCode).render('login', {
            error: err.message
        });
    }

    // REGISTER ERROR
    if (req.originalUrl === '/api/v1/auth/register') {
        return res.status(err.statusCode).render('register', {
            error: err.message
        });
    }

    // API
    if (req.originalUrl.startsWith('/api')) {
        return res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack
        });
    }

    // RENDERED WEBSITE
    console.error('ERROR 💥', err);

    res.status(err.statusCode).render('error', {
        title: 'Something went wrong!',
        msg: err.message
    });
};

const sendErrorProd = (err, req, res) => {

    // LOGIN ERROR
    if (req.originalUrl === '/api/v1/auth/login') {
        return res.status(err.statusCode).render('login', {
            error: err.isOperational
                ? err.message
                : 'Something went wrong. Please try again.'
        });
    }

    // REGISTER ERROR
    if (req.originalUrl === '/api/v1/auth/register') {
        return res.status(err.statusCode).render('register', {
            error: err.isOperational
                ? err.message
                : 'Something went wrong. Please try again.'
        });
    }

    if (req.originalUrl.startsWith('/api')) {

        // Operational error
        if (err.isOperational) {
            return res.status(err.statusCode).json({
                status: err.status,
                message: err.message
            });
        }

        // Programming / unknown error
        console.error('ERROR 💥', err);

        return res.status(500).json({
            status: 'error',
            message: 'Something went very wrong!'
        });
    }

    // Operational error
    if (err.isOperational) {
        return res.status(err.statusCode).render('error', {
            title: 'Something went wrong!',
            msg: err.message
        });
    }

    // Programming / unknown error
    console.error('ERROR 💥', err);

    return res.status(500).render('error', {
        title: 'Something went wrong!',
        msg: 'Please try again later.'
    });
};

module.exports = (err, req, res, next) => {

    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // DEVELOPMENT
    if (process.env.NODE_ENV === 'development') {
        sendErrorDev(err, req, res);
    }

    // PRODUCTION
    else if (process.env.NODE_ENV === 'production ') {

        let error = { ...err };

        // Add these properties because spreading Error
        // doesn't copy them automatically
        error.name = err.name;
        error.code = err.code;
        error.message = err.message;

        if (error.name === 'CastError') {
            error = handleCastErrorDB(error);
        }

        if (error.code === 11000) {
            error = handleDuplicateFieldsDB(error);
        }

        if (error.name === 'ValidationError') {
            error = handleValidationErrorDB(error);
        }

        if (error.name === 'JsonWebTokenError') {
            error = handleJWTError();
        }

        if (error.name === 'TokenExpiredError') {
            error = handleJWTExpiredError();
        }

        sendErrorProd(error, req, res);
    }
};