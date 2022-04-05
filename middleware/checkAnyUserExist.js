const User = require("../models/User");
const { createDefaultUser } = require("./createDefaultUser");
const logger = require("../logger/logger")

const checkAnyUserExist = async (next) => {
    const userCount = await User.find().count();
    if (userCount === 0) {
        const result = await createDefaultUser();
        console.log(`username: ${result.username}`)
        console.log(`password: ${result.password}`)
    }
}

module.exports = {
    checkAnyUserExist
}