const {Router} = require("express")
const Rating = require("../controller/rating.controller")
const AuthMiddleware = require("../midlewares/authMiddleware")

const ratingRoute = new Router()

ratingRoute.post("/create", AuthMiddleware, Rating.create)
ratingRoute.get("/get/:id", Rating.getOne)
ratingRoute.patch("/update/:id", AuthMiddleware, Rating.update)
ratingRoute.delete("/delete/:id", AuthMiddleware, Rating.update)

module.exports = ratingRoute