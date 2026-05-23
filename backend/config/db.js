const mongoose = require('mongoose');
const dns = require('dns');
require('dotenv').config();

//connect to MongoDB
const connectDB = async () => {
    try {
        const currentDnsServers = dns.getServers();
        if (currentDnsServers.length === 1 && currentDnsServers[0] === '127.0.0.1') {
            dns.setServers(['8.8.8.8', '8.8.4.4']);
            console.log('Fallback DNS servers set:', dns.getServers());
        }

        await mongoose.connect(process.env.MONGO_URL, {
            serverSelectionTimeoutMS: 10000,
        });
        console.log('MongoDB connected');
    }
    catch (error) {
        console.error('MongoDB connection error:', error.message);
        console.warn('Server will continue running without database connection');
    }
};

module.exports = connectDB;