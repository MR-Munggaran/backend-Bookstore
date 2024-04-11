const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        username:{
            type: String,
            required: true,
            unique: true
        },
        email: {
            type: String,
            required: true,
            unique: true
        },
        password: {
            type: String,
            required: true,
            unique: true
        },
        token: {
            type: String,
        }
    },
    { timestamps: true }
);

const User = mongoose.model('Users', userSchema);

module.exports = User;
