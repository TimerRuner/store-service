const {model: modelRole, Schema: SchemaRole} = require("mongoose")

const roleSchema = new SchemaRole({
    value: {type: String, unique: true, required: true},
    description: {type: String, required: true}
})

module.exports = modelRole("Roles", roleSchema)