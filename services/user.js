const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const logger = require('../logger/logger');
const ErrorException = require('../error-handler/error-exception');

const login = async (request) => {
    const user = await User.findOne({ userName: request.body.userName });
    console.log(user);
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (validPassword) {
            logger.info('User is logged in.');
            const token = jwt.sign(
                {
                    username: user.username,
                    userId: user._id
                },
                process.env.jwt_key,
                { expiresIn: '24h' }
            );
            return { token: token };
        } else {
            logger.warn('Password is not correct');
            throw ErrorException.BadRequest('Password is not correct');
        }
    } else {
        logger.warn('User not found');
        throw ErrorException.BadRequest('User not found');
    }
};

const create = async (user) => {
    const сheckUserName = await User.findOne({ userName: user.userName });
    if (!сheckUserName) {
        const saltRounds = 10;
        const salt = await bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(user.password, salt);
        const newUser = new User({
            userName: user.userName,
            password: hashPassword
        });
        await newUser.save();
        newUser.password = user.password;
        return newUser;
    } else {
        throw ErrorException.BadRequest('The User with this User Name already exists.');
    }
};

module.exports = {
    login,
    create
};
