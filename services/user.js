const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt");
const logger = require("../logger/dev-logger")

const login = async (request) => {
    const user = await User.findOne({ email: request.body.email })
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (validPassword) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, 'dev-jwt', { expiresIn: '24h' })
            return token
        } else {
            throw new ApplicationError("Password is not correct", 401)
        }
    } else {
        throw new ApplicationError("User not found", 401)
    }
};

const create = async (user) => {
    console.log("work:createUser", user)
    const newUser = new User({
        email: user.email,
        password: user.password,
    })
    return newUser.save()
}


module.exports = {
    login,
    create
}

















// const login = async (request, response) => {
//     const user = await User.findOne({ email: request.body.email })
//     if (user) {
//         if (request.body.password === user.password) {
//             const token = jwt.sign({
//                 email: user.email,
//                 userId: user._id
//             }, 'dev-jwt', { expiresIn: '24h' })
//             response.status(200).json({
//                 token: token
//             })
//         } else {
//             response.status(401).json({ message: "Password is not correct" })
//         }
//     } else {
//         response.status(404).json({ message: "User not found" })
//     }
// };

// const logout = (request, response) => {

// };

module.exports = {
    login,
    // logout
}