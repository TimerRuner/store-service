const ApiError = require("../error/ApiError")
const basketService = require("../services/basket.service")

class BasketController {
    async create(req, res, next) {
        try {
            const {user} = req
            const basket = await basketService.create(user.id)
            res.json(basket)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async get(req, res, next) {
        try {
            const {user} = req
            const basket = await basketService.get(user.id)
            res.json(basket)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {user} = req
            const basket = await basketService.delete(user.id)
            res.json(basket)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new BasketController()