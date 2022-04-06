const User = require("../models/User");
const jwt = require('jsonwebtoken');
const bcrypt = require("bcryptjs/dist/bcrypt")
const logger = require("../logger/dev-logger")

const login = async (request) => {
    const user = await User.findOne({ username: request.body.username })
    if (user) {
        const validPassword = await bcrypt.compare(request.body.password, user.password)
        if (validPassword) {
            const token = jwt.sign({
                username: user.usernameі,
                userId: user._id
            }, process.env.jwt, { expiresIn: '24h' })
            return { token: token }
        } else {
            throw new ApplicationError("Password is not correct", 401)
        }
    } else {
        throw new ApplicationError("User not found", 404)
    }
};

const create = async (user) => {
    bcrypt.genSalt(10)
        .then(salt => {
            bcrypt.hash(user.password, salt)
                .then(hashPassword => {
                    const newUser = new User({
                        username: user.username,
                        password: hashPassword,
                    })
                    return newUser.save()
                })
        })
}

module.exports = {
    login,
    create
}