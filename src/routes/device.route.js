const {Router} = require("express")
const Device = require("../controller/device.controller")
const RoleMiddleware = require("../midlewares/roleMiddleware")
const multer = require('multer');

const storage = multer.memoryStorage();
const upload = multer({ storage });

const deviceRoute = new Router()

deviceRoute.post("/create", RoleMiddleware(["ADMIN"]), upload.single('picture'),  Device.create)
deviceRoute.get("/all", Device.getAll)
deviceRoute.get("/:id", Device.getOne)
deviceRoute.get("/search/:query", Device.search)
deviceRoute.patch("/update/:id", RoleMiddleware(["ADMIN"]), upload.single('picture'), Device.update)
deviceRoute.delete("/delete/:id", RoleMiddleware(["ADMIN"]), Device.delete)

module.exports = deviceRoute