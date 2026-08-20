const mongoose = require('mongoose');
const validator = require('validator')
const bcrypt = require('bcryptjs')

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please provide your name'],
        trim: true,
        minlength: [3, 'Name must be at least 3 characters'],
        maxlength: [35, 'Name must be less than 35 characters']
    },
    email: {
        type: String,
        required: [true, 'Please provide your email'],
        unique: true,
        lowercase: true,
        validate: {
            validator: function (value) {
                return /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/.test(value);
            },
            message: 'Please provide a valid email address'
        }
    },
    password: {
        type: String,
        required: [true, 'Please provide password'],
        minlength: [8, 'Password must be at least 8 characters'],
        select: false
    },
    passwordChangedAt: Date
})

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;

    this.password = await bcrypt.hash(this.password, 12);
})

userSchema.pre('save', function () {
    if (!this.isModified('password') || this.isNew) return;

    this.passwordChangedAt = Date.now() - 1000;
})


userSchema.methods.correctPassword = async function (candidatePassword, userPassword) {
    return await bcrypt.compare(candidatePassword, userPassword);
}

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {

    if (this.passwordChangedAt) {

        const changedTimestamp = parseInt(
            this.passwordChangedAt.getTime() / 1000,
            10
        );

        return JWTTimestamp < changedTimestamp;
    }

    return false;
};

const User = mongoose.model('User', userSchema);
module.exports = User;