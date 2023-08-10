const BrandModule = require("../models/brand")

class BrandService {
    async create(name) {
        return await BrandModule.create({name})
    }

    async getAll() {
        return await BrandModule.find({})
    }

    async getOne(id) {
        return await BrandModule.findOne({_id: id})
    }

    async update(name, id) {
        return await BrandModule.findOneAndUpdate({_id: id}, {name}, {new: true})
    }

    async delete(id) {
       return await BrandModule.findOneAndDelete({_id: id})
    }
}

module.exports = new BrandService()