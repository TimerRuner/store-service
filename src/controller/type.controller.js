const ApiError = require("../error/ApiError")
const TypeService = require("../services/type.service")

class TypeController {
    async create(req, res, next) {
        try {
            const {name} = req.body
            const type = await TypeService.create(name)
            res.json(type)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next){
        try {
            const types = await TypeService.getAll()
            res.json(types)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next){
        try {
            const {name} = req.body
            const {id} = req.params
            const type = await TypeService.update(name, id)
            res.json(type)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const type = await TypeService.delete(id)
            res.json(type)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new TypeController()