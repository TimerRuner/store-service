const {model: typeModel, Schema: SchemaType} = require("mongoose")

const typeSchema = new SchemaType({
    name: {type: String, unique: true, require: true}
})

module.exports = typeModel("Brands", typeSchema)