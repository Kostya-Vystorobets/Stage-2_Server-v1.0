module.exports = (response, error) => {
    response.status(500).json({
        success: false,
        massage: error.message ? error.massage : error
    })
}