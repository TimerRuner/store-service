const {Router} = require("express")
const BsketDevice = require("../controller/basket_device.controller")
const AuthMiddleware = require("../midlewares/authMiddleware")

const basketDeviceRoute = new Router()

basketDeviceRoute.post("/create", AuthMiddleware, BsketDevice.create)
basketDeviceRoute.get("/all", AuthMiddleware, BsketDevice.getAll)
basketDeviceRoute.get("/get/:id", BsketDevice.getOne)
basketDeviceRoute.delete("/delete/:id", BsketDevice.delete)

module.exports = basketDeviceRoute