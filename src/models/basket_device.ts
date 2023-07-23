const {model: basketDeviceModel, Schema: SchemaBasketDevice} = require("mongoose")

const basketDeviceSchema = new SchemaBasketDevice({
    basketId: {type: SchemaBasketDevice.Types.ObjectId, ref: "Baskets"},
    deviceId: {type: SchemaBasketDevice.Types.ObjectId, ref: "Devices"}
})

module.exports = basketDeviceModel("BasketDevices", basketDeviceSchema)