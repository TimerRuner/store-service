const {module: moduleUser, Schema: SchemaUser} = require("mongoose")

const userSchema = new SchemaUser({
    fullName: {type: String, require: true},
    email: {type: String, require: true, unique: true},
    password: {type: String, require: true},
    roleId: {type: SchemaUser.Types.ObjectId, ref: "Roles"}
})

module.exports = moduleUser("Users", userSchema)