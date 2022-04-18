const User = require("../models/User");
const { createDefaultUser } = require("./createDefaultUser");
const logger = require('../logger/logger');

const checkAnyUserExist = async (next) => {
    try {
        const userCount = await User.find().count();
        if (userCount === 0) {
            const user = await createDefaultUser();
            logger.info(`userName: ${user.userName}`)
            logger.info(`password: ${user.password}`)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkAnyUserExist
}