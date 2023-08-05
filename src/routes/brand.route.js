const {Router} = require("express")
const Brand = require("../controller/brand.controller")

const brandRoute = new Router()

brandRoute.post("/create", Brand.create)
brandRoute.get("/all", Brand.getAll)
brandRoute.patch("/update/:id", Brand.update)
brandRoute.delete("/delete/:id", Brand.delete)

module.exports = brandRoute