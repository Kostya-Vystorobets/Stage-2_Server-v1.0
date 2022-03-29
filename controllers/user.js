const service = require('../services/user')


const login = async (request, response, next) => {
    try {
        const user = await service.login({ email: request.body.email })
        return response.send(user)
    } catch (error) {
        next(error)
    }
};

const logout = (request, response) => {

};

module.exports = {
    login,
    logout
}