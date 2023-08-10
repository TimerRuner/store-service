const BasketDeviceModel = require("../models/basket_device")
const BasketService = require("../services/basket.service")
const DeviceService = require("../services/device.service")

class BasketDeviceService {
    async create(userId, deviceId) {
        if(!userId && !deviceId) {
            throw new Error("User aren't authorized or device doesn't exist")
        }
        const basket = await  BasketService.get(userId)
        const device = await DeviceService.getOne(deviceId)
        if(device) {
            throw new Error(`This device already exist on basket`)
        }

        return await BasketDeviceModel.create({deviceId: deviceId, basketId: basket.id})
    }

    async getAll(userId) {
        const basket = await BasketService.get(userId)
        return await BasketDeviceModel.find({basketId: basket.id}).populate("deviceId")
    }

    async getOne(id) {
        return await BasketDeviceModel.findOne({_id: id}).populate("deviceId")
    }

    async delete(id) {
        return await BasketDeviceModel.findOneAndDelete({_id: id})
    }
}

module.exports = new BasketDeviceService()