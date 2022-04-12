const User = require("../models/User");
const { createDefaultUser } = require("./createDefaultUser");

const checkAnyUserExist = async (next) => {
    try {
        const userCount = await User.find().count();
        if (userCount === 0) {
            const result = await createDefaultUser();
            console.log(`username: ${result.username}`)
            console.log(`password: ${result.password}`)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkAnyUserExist
}