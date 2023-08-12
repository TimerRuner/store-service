const {Router} = require("express")
const DeviceCharacteristic = require("../controller/device_characteristic.controller")
const roleMiddleware = require("../midlewares/roleMiddleware")

const deviceCharacteristicRoute = new Router()

deviceCharacteristicRoute.post('/create', DeviceCharacteristic.create)
deviceCharacteristicRoute.get('/all/:deviceId', DeviceCharacteristic.getAll)
deviceCharacteristicRoute.get('/:id', DeviceCharacteristic.getOne)
deviceCharacteristicRoute.patch('/update/:id', roleMiddleware(["ADMIN"]), DeviceCharacteristic.update)
deviceCharacteristicRoute.delete('/delete/:id', roleMiddleware(["ADMIN"]), DeviceCharacteristic.delete)

module.exports = deviceCharacteristicRoute