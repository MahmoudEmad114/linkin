const mongoose = require('mongoose');
const dotenv = require('dotenv');
dotenv.config({ path: './.env' })
const app = require('./app');

mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log('DB connection successful!');
        console.log('Current DB Name:', mongoose.connection.name);
        console.log('Connection readyState:', mongoose.connection.readyState);
    });


const port = process.env.PORT || 3050;
app.listen(port, () => {
    console.log(`App running on port ${port}`);
})