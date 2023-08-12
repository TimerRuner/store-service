const ApiError = require("../error/ApiError")
const RatingService = require("../services/rating.service")

class RaringController {
    async create(req, res, next) {
        try {
            const {user} = req
            const dto = req.body
            const rate = await RatingService.create({...dto, userId: user._id})
            res.json(rate)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const rate = await RatingService.getOne(id)
            res.json(rate)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {id} = req.params
            const dto = req.body
            const rate = await RatingService.update(dto, id)
            res.json(rate)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const rate = await RatingService.delete(id)
            res.json(rate)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new RaringController()