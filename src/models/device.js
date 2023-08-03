const {model: deviceModel, Schema: SchemaDevice} = require("mongoose")

const deviceSchema = new SchemaDevice({
    name: {type: String, unique: true, require: true},
    picture: {type: String, require: false},
    price: {type: Number, require: true},
    typeId: {type: SchemaDevice.Types.ObjectId, ref: "Types"},
    brandId: {type: SchemaDevice.Types.ObjectId, ref: "Brands"},
    userId: {type: SchemaDevice.Types.ObjectId, ref: "Users"},
})

module.exports = deviceModel("Devices", deviceSchema)