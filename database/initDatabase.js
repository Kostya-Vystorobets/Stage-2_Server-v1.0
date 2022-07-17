const mongoose = require('mongoose');
const logger = require('../logger/logger');
const { checkUserExist } = require('./seedDefaultUser');
require('dotenv').config();

const initDatabase = async () => {
    try {
        await mongoose.connect(process.env.mongoURI);
        logger.info('Connected to MongoDB.');
        await checkUserExist();
    } catch (error) {
        logger.error(error);
    }
};

module.exports = {
    initDatabase
};
