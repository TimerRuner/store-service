const ApiError = require("../error/ApiError")
const BasketDeviceService = require("../services/basket_device.service")

class BasketDeviceController {
    async create(req, res, next){
        try {
            const {user} = req
            const {deviceId} = req.body
            const basketDevice = await BasketDeviceService.create(user.id, deviceId)
            res.json(basketDevice)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {user} = req
            const basketDevices = await BasketDeviceService.getAll(user.id)
            res.json(basketDevices)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const basketDevice = await BasketDeviceService.getOne(id)
            res.json(basketDevice)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const basketDevice = await BasketDeviceService.delete(id)
            res.json(basketDevice)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BasketDeviceController()