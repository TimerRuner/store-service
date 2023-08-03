const {Router} = require("express")
const Account = require("../controller/account.controller")

const accountRoute = new Router()

accountRoute.get("/activate/:link", Account.activate)

module.exports = accountRoute