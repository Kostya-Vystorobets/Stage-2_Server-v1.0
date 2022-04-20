const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs/dist/bcrypt');
const logger = require('../logger/logger');
const AppError = require('../errors/applicationError');

const login = async (request) => {
    const user = await User.findOne({ username: request.body.username });
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password);
        if (validPassword) {
            logger.info('User is logged in.');
            const token = jwt.sign(
                {
                    username: user.usernameі,
                    userId: user._id
                },
                process.env.jwt,
                { expiresIn: '24h' }
            );
            return { token: token };
        } else {
            logger.warn('Password is not correct');
            throw new AppError('Password is not correct', 401);
        }
    } else {
        logger.warn('User not found');
        throw new AppError('User not found', 404);
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
        throw new AppError('The User with this User Name already exists.', 404);
    }
};

module.exports = {
    login,
    create
};
