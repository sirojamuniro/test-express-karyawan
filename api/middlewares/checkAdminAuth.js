const jwt = require('jsonwebtoken')

// eslint-disable-next-line consistent-return
module.exports = (req, res, next) => {
    try {
        const token = req.headers.authorization.split(' ')[1]
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        if (decoded.userType !== 'admin') {
            return res.status(403).json({
                message: 'User must be admin!'
            })
        }
        req.userData = decoded
        next()
    } catch (error) {
        return res.status(401).json({
            message: 'Auth failed'
        })
    }
}
