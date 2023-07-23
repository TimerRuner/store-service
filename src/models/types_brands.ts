const {model: typeBrandModel, Schema: SchemaTypeBrand} = require("mongoose")

const typeBrandSchema = new SchemaTypeBrand({
    typeId: {type: SchemaTypeBrand.Types.ObjectId, ref: "Types"},
    brandId: {type: SchemaTypeBrand.Types.ObjectId, ref: "Brands"}
})

module.exports = typeBrandModel("TypeBrands", typeBrandSchema)