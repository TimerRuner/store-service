const {Router} = require("express")
const Type = require("../controller/type.controller")

const typeRoute = new Router()

typeRoute.post('/create', Type.create)
typeRoute.get('/all', Type.getAll)
typeRoute.patch('/update/:id', Type.update)
typeRoute.delete('/delete/:id', Type.delete)

module.exports = typeRoute