const mongoose = require('mongoose');
const linkSchema = new mongoose.Schema({
    title: {
        type: String,
        required: [true, 'You must provide a title']
    },
    url: {
        type: String,
        required: [true, 'You must provide url']
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
},
    {
        timestamps: true
    })

const Link = mongoose.model('Link', linkSchema);
module.exports = Link;