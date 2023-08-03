const RoleModel = require("../models/role")

class RoleService {
    async create(dto) {
        const role = await RoleModel.findOne({value: dto.value})
        if(role) throw new Error(`Role ${dto.value} already exist`)
        return await RoleModel.create(dto)
    }

    async get() {
        return await RoleModel.find({})
    }

    async getOne(value) {
        if(!value) throw new Error("Value doesn't exist")
        return await RoleModel.findOne({value})
    }

    async update(dto, value) {
        if(!value) throw new Error("Role name doesn't exist")

        return await RoleModel.findOneAndUpdate({value}, dto, {new: true})
    }

    async delete(value) {
        const deleteRole = await RoleModel.findOneAndDelete({value})

        if(!deleteRole) throw new Error("Role name doesn't exist")

        return `Role ${value} deleted successfully`
    }

}

module.exports = new RoleService()