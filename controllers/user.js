const service = require('../services/user');


const login = async (request, response, next) => {
    try {
        const token = await service.login(request);
        return response.send(token);
    } catch (error) {
        next(error);
    }
};

module.exports = {
    login
};