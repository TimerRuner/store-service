const DeviceCharacteristicModel = require("../models/device_characteristic")

class DeviceCharacteristicService {
    async create(dto){
        return await DeviceCharacteristicModel.create(dto)
    }

    async getAll(deviceId){
        return await DeviceCharacteristicModel.find({deviceId})
    }

    async getOne(id) {
        return await DeviceCharacteristicModel.findById(id)
    }

    async update(dto, id) {
        return await DeviceCharacteristicModel.findOneAndUpdate({_id: id}, dto, {new: true})
    }

    async delete(id) {
        return await DeviceCharacteristicModel.findOneAndDelete({_id: id})
    }

    async deleteByDeviceId(deviceId) {
        return await DeviceCharacteristicModel.findOneAndDelete({deviceId})
    }
}

module.exports = new DeviceCharacteristicService()