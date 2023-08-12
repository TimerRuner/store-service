const ApiError = require("../error/ApiError")
const DeviceCharacteristicService = require("../services/device_characteristic.service")

class DeviceCharacteristicController {
    async create(req, res, next) {
        try {
            const dto = req.body
            const characteristics = await DeviceCharacteristicService.create(dto)
            res.json(characteristics)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {deviceId} = req.params
            const characteristic = await DeviceCharacteristicService.getAll(deviceId)
            res.json(characteristic)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const characteristic = await DeviceCharacteristicService.getOne(id)
            res.json(characteristic)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const dto = req.body
            const characteristic = await DeviceCharacteristicService.update(dto, id)
            res.json(characteristic)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const characteristic = await DeviceCharacteristicService.delete(id)
            res.json(characteristic)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new DeviceCharacteristicController()