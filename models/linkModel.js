const mongoose = require('mongoose');
const validator = require('validator');

const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must provide a title'],
        trim: true,
        minlength: [2, 'Title is too short'],
        maxlength: [50, 'Title is too long'],
    },
    url: {
        type: String,
        required: [true, 'You must provide url'],
        trim: true,
        validate: {
            validator: validator.isURL,
            message: 'You must provide a valid URL'
        }
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }
},
    {
        timestamps: true
    }
)

linkSchema.index({ user: 1 });

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;