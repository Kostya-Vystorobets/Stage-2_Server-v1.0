const crypto = require("crypto");
const service = require('../services/user');
const logger = require("../logger/dev-logger");


async function getKey(byteSize) {
    let key = await crypto.randomBytes(byteSize);
    return key;
}

const createDefaultUser = async (next) => {
    try {
        const username = "User";
        const password = await getKey(12);
        const data = { username: username, password: password.toString("hex") };
        await service.create(data)
        return data;
    } catch (error) {
        next(error);
    }
}

module.exports = {
    createDefaultUser
}