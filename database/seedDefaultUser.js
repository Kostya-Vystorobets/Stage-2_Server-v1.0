const crypto = require('crypto');
const User = require('../models/User');
const service = require('../services/user');
const logger = require('../logger/logger');

async function getKey(byteSize) {
    let key = await crypto.randomBytes(byteSize);
    return key;
}

const createDefaultUser = async () => {
    const userName = 'Admin';
    const password = await getKey(12);
    const data = { userName: userName, password: password.toString('hex') };
    await service.create(data);
    logger.info('Default User was created.');
    return data;
};

const checkUserExist = async (next) => {
    try {
        const userCount = await User.find().count();
        if (userCount === 0) {
            const user = await createDefaultUser();
            logger.info(`userName: ${user.userName}`);
            logger.info(`password: ${user.password}`);
        }
    } catch (error) {
        next(error);
    }
};

module.exports = { checkUserExist };
