const {model: deviceCharacteristicModel, Schema: SchemaDeviceCharacteristic} = require("mongoose")

const deviceCharacteristicSchema = new SchemaDeviceCharacteristic({
    title: {type: String, require: true},
    description: {type: String, require: false},
    deviceId: {type: SchemaDeviceCharacteristic.Types.ObjectId, ref: "Devices"}
})

module.exports = deviceCharacteristicModel("DeviceCharacteristics", deviceCharacteristicSchema)