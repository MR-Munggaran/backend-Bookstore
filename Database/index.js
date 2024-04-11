const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_SERVER);
        console.log('Connect to database is Successfully');
    } catch (error) {
        console.error('Connection to database failed:', error);
    }
};

module.exports = connectDB;
