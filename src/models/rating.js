const {model: ratingModel, Schema: SchemaRating} = require("mongoose")

const ratingSchema = new SchemaRating({
    rate: {type: Number, require: true},
    userId: {type: SchemaRating.Types.ObjectId, ref: "Users"},
    deviceId: {type: SchemaRating.Types.ObjectId, ref: "Devices"}
})

module.exports = ratingModel("Ratings", ratingSchema)