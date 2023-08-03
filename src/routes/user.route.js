const {Router} = require("express")
const User = require("../controller/user.controller")

const userRoute = new Router()

userRoute.post("/create", User.create)
userRoute.get("/get", User.getUserByEmail)
userRoute.get("/get/:id", User.getUserById)
userRoute.patch("/update/:id", User.update)
userRoute.delete("/delete/:id", User.delete)

module.exports = userRoute