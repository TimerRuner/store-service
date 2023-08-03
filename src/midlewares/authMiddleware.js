const jwt = require("jsonwebtoken")

module.exports = (req, res, next) => {
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

       req.user = userData
       next()
   } catch (e) {
       res.status(401).json({message: e.message})
   }
}