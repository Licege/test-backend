module.exports = (response, error) => {
    switch (error.name) {
        case 'SequelizeUniqueConstraintError':
            response.status(400).json({
                success: false,
                message: 'Already Exists'
            })
            break

        default:
            response.status(400).json({
                success: false,
                message: error.models ? error.message : error
            })
    }
}
