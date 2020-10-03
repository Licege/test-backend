module.exports = (response, error) => {
    response.status(400).json({
        success: false,
        message: error.models ? error.message : error
    })
}
