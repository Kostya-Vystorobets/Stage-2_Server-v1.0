const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt");
const logger = require("../logger/logger");
const ApplicationError = require('../errors/applicationError');

const login = async (request) => {
    const user = await User.findOne({ username: request.body.username })
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (validPassword) {
            logger.info("User is logged in")
            const token = jwt.sign({
                username: user.usernameі,
                userId: user._id
            }, process.env.jwt, { expiresIn: '24h' })
            return { token: token }
        } else {
            logger.warn('Password is not correct')
            throw new ApplicationError('Password is not correct', 401)
        }
    } else {
        logger.warn('User not found')
        throw new ApplicationError('User not found', 404)
    }
};

const create = async (user) => {
    const saltRounds = 10;
    const salt = await bcrypt.genSalt(saltRounds)
    const hashPassword = await bcrypt.hash(user.password, salt)
    const newUser = new User({
        username: user.username,
        password: hashPassword,
    })
    return newUser.save()
};

module.exports = {
    login,
    create
};