const crypto = require('crypto');
const logger = require('../logger/logger');
const service = require('../services/user');


async function getKey(byteSize) {
    let key = await crypto.randomBytes(byteSize);
    return key;
}

const createDefaultUser = async (next) => {
    try {
        const username = "Admin";
        const password = await getKey(12);
        const data = { username: username, password: password.toString("hex") };
        await service.create(data)
        logger.info("Default User was created.")
        return data;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createDefaultUser
}