const {model: basketModel, Schema: SchemaBasket} = require("mongoose")

const basketSchema = new SchemaBasket({
    userId: {type: SchemaBasket.Types.ObjectId, ref: "Users"}
})

module.exports = basketModel("Baskets", basketSchema)