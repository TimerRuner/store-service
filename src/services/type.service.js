const TypeModel = require("../models/type")
class TypeService {
    async create(name) {
        return await TypeModel.create({name})
    }

    async getAll(){
        return await TypeModel.find({})
    }

    async getOne(id) {
        return await TypeModel.findOne({_id: id})
    }

    async update(name, id) {
        return await TypeModel.findOneAndUpdate({_id: id}, {name}, {new: true})
    }

    async delete(id) {
        return await TypeModel.findOneAndDelete({_id: id})
    }
}

module.exports = new TypeService()