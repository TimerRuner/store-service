const basketModel = require("../models/basket")
class BasketService {
    async create(userId) {
        if(!userId) {
            throw new Error("User's id doesn't exist")
        }
        return await basketModel.create({userId})
    }

    async get(userId) {
        if(!userId) {
            throw new Error("User's id doesn't exist")
        }

    }

    async delete(userId) {
        if(!userId) {
            throw new Error("User's id doesn't exist")
        }
        await basketModel.findOneAndDelete({userId})
        return `User with id ${userId} deleted successfully`
    }


}

module.exports = new BasketService()