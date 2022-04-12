const mongoose = require('mongoose');
const bcrypt = require('bcryptjs/dist/bcrypt')
const logger = require('../logger/logger')
const path = require('path');
const { checkAnyUserExist } = require('./checkAnyUserExist')
require('dotenv').config();


const initDatabase = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        logger.info("Connected to MongoDB.");
        await checkAnyUserExist();
    } catch (error) {
        logger.error(error)
    }
}

module.exports = {
    initDatabase
}