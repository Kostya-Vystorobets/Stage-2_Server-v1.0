const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt")
const logger = require("../logger/dev-logger")

const login = async (request) => {
    const user = await User.findOne({ username: request.body.username })
    console.log(user)
    if (user) {
        console.log(request.body.password)
        console.log(user.password)
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        console.log(validPassword)
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
        throw new ApplicationError("User not found", 404)
    }
};

const create = async (user) => {
    const newUser = new User({
        username: user.username,
        password: user.password,
    })
    return newUser.save()
}

module.exports = {
    login,
    create
}