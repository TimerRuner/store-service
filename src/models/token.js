const {model: tokenModel, Schema: SchemaToken} = require("mongoose")

const tokenSchema = new SchemaToken({
    refreshToken: {type: String, maxlength: 5000, unique: true, require: true},
    userId: {type: SchemaToken.Types.ObjectId}
})

module.exports = tokenModel("Tokens", tokenSchema)