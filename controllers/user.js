const User = require("../models/User");
const jwt = require('jsonwebtoken');


module.exports.login = async function (request, response) {
    const user = await User.findOne({email: request.body.email})
    if (user) {
        if (request.body.password === user.password) {
            const token = jwt.sign({
                email: user.email,
                userId: user._id
            }, 'dev-jwt', {expiresIn: '24h'})
            response.status(200).json({
                token: token
            })     
        } else {
            response.status(401).json({message: "Password is not correct"}) 
        }
    } else {
        response.status(404).json({message: "User not found"})
    }
};

module.exports.logout = function (request, response) {
    
};