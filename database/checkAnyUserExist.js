const User = require("../models/User");
const { createDefaultUser } = require("./createDefaultUser");

const checkAnyUserExist = async (next) => {
    try {
        const userCount = await User.find().count();
        if (userCount === 0) {
            const user = await createDefaultUser();
            console.log(`userName: ${user.userName}`)
            console.log(`password: ${user.password}`)
        }
    } catch (error) {
        next(error)
    }
}

module.exports = {
    checkAnyUserExist
}