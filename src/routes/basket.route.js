const {Router} = require("express")
const Basket = require("../controller/basket.controller")
const AuthGuard = require("../midlewares/authMiddleware")

const basketRoute = new Router()

basketRoute.post("/create", AuthGuard, Basket.create)
basketRoute.get("/get", Basket.get)

module.exports = basketRoute