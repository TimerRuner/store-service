const {model: brandModel, Schema: SchemaBrand} = require("mongoose")

const brandSchema = new SchemaBrand({
    name: {type: String, unique: true, require: true}
})

module.exports = brandModel("Brands", brandSchema)