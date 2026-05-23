//import express and other dependencies
const express = require('express');
require("dotenv").config();
const app=require('./app');
const connectDB = require('./config/db');
//connect to database
connectDB();
//middlewares to parse JSON
app.use(express.json());
//start the server
const PORT = process.env.PORT || 5000;
//app.listen(PORT, () => {
    //console.log(`Server is running on port ${PORT}`);

    module.exports = app; // Export the app for testing

