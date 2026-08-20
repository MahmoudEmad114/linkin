const express = require('express');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController')

const authRouter = require('./routes/authRoutes');
const userRouter = require('./routes/userRoutes');
const linkRouter = require('./routes/linkRoutes');
const viewRouter = require('./routes/viewRoutes');


const app = express();
app.set('view engine', 'ejs')

app.use(cookieParser());

app.use(morgan('dev'));

app.use(express.json());

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    console.log('Hello from the middleware');
    next();
});

app.use('/', viewRouter);
app.use('/api/v1/auth', authRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/links', linkRouter);




// app.all((req, res, next) => {
//     next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
// })
app.use(globalErrorHandler)
module.exports = app;

