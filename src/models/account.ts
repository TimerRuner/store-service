const {model: accountModel, Schema: SchemaAccount} = require("mongoose")

const accountSchema = new SchemaAccount({
    activationLink: {type: String, require: false, unique: true},
    isActivated: {type: Boolean, default: false},
    userId: {type: SchemaAccount.Types.ObjectId, ref: "Accounts"}
})

module.exports = accountModel("Accounts", accountSchema)