const RoleService = require("../services/role.service.js")
const ApiError = require("../error/ApiError.js")

class RoleController {
    async create(req, res, next) {
        try {
            const {value, description} = req.body
            const role = await RoleService.create({value, description})
            return res.json(role)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const roles = await RoleService.get()
            return res.json(roles)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getRole(req, res, next) {
        try {
            const { value } = req.params

            const role = await RoleService.getOne(value)
            return res.json(role)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async updateRole(req, res, next) {
        try {
            const dto = req.body
            const {value} = req.params

            const role = await RoleService.update(dto, value)
            res.json(role)

        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async deleteRole(req, res, next) {
        try {
            const {value} = req.params
            const deletedRole = await RoleService.delete(value)
            res.json(deletedRole)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

}

module.exports = new RoleController()