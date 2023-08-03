const jwt = require("jsonwebtoken")

module.exports = (role) => (req, res, next) => {
    if(req.method === "OPTIONS") {
        next()
    }

    try {
        const authorizationHeader = req.headers.authorization
        if(!authorizationHeader) {
            res.status(401).json({message: "User Unauthorized"})
        }

        const accessToken =authorizationHeader.split(" ")[1]
        if(!accessToken) {
            res.status(401).json({message: "User Unauthorized"})
        }

        const userData = jwt.verify(accessToken, process.env.JWT_SECRET)
        if(!userData) {
            res.status(401).json({message: "User Unauthorized"})
        }

        const matchedData = role.some(specialRole => specialRole.includes(userData.role))
        if(userData.role === matchedData) {
            req.user = userData
            next()
        } else {
            res.status(401).json({message: "User hasn't credentials"})
        }

    } catch (e) {
        res.status(401).json({message: e.message})
    }
}