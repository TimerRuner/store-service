const userModel = require("../models/user")
const roleService = require("../services/role.service")
const basketService = require("../services/basket.service")
class UserService {
    async create(dto) {
        let role
        try {
            role = await roleService.getOne(dto.role)
        } catch (e) {
            role = await roleService.getOne("USER")
        }
        if(dto.role) delete dto.role
        dto.roleId = role.id

        const user = await userModel.create(dto)

        await basketService.create(user.id)

        const createdUser = await userModel.findOne({_id: user.id}).populate("roleId")

        return createdUser
    }

    async getUserByEmail(email) {
        if(!email) throw new Error("Email doesn't exist")

        return await userModel.findOne({email}).populate('roleId')
    }

    async getUserById(id) {
        if(!id) throw new Error("Id doesn't exist")

        return await userModel.findOne({_id: id})
    }

    async update(dto, id) {
        return await userModel.findOneAndUpdate({_id: id}, dto, {new: true})
    }

    async checkUser(email) {
        return await userService.getUserByEmail(email)
    }

    async delete(id) {
        await userModel.findOneAndDelete({_id: id})
        await basketService.delete(id)
        return `User with id - ${id} deleted successfully`
    }
}

module.exports = new UserService()