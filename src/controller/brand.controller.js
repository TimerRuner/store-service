const ApiError = require("../error/ApiError")
const BrandService = require("../services/brand.service")

class BrandController {
    async create(req, res, next) {
        try {
            const {name} = req.body

            const brand = await BrandService.create(name)
            res.json(brand)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const brands = await BrandService.getAll()
            res.json(brands)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const {name} = req.body
            const {id} = req.params
            const brand = await BrandService.update(name, id)
            res.json(brand)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const brand = await BrandService.delete(id)
            res.json(brand)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new BrandController()