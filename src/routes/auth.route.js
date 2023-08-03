const {Router} = require("express")
const Auth = require("../controller/auth.controller")

const authRoute = new Router()

authRoute.post("/login", Auth.login)
authRoute.post("/registration", Auth.registration)
authRoute.post("/logout", Auth.logout)
authRoute.get("/refresh", Auth.refresh)

module.exports = authRoute