const ApiError = require("../error/ApiError")
const userService = require("../services/user.service")
class UserController {
    async create(req, res, next) {
        try {
            const dto = req.body
            const user = await userService.create(dto)
            res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getUserByEmail(req, res, next) {
        try {
            const { email } = req.body
            const user = await userService.getUserByEmail(email)
            res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getUserById(req, res, next) {
        try {
            const { id } = req.params
            const user = await userService.getUserById(id)
            res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next) {
        try {
            const dto = req.body
            const { id } = req.params
            const user = await userService.update(dto, id)
            res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next) {
        try {
            const {id} = req.params
            const user = await userService.delete(id)
            res.json(user)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new UserController()