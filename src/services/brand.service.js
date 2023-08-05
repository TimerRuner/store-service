const BrandModule = require("../models/brand")

class BrandService {
    async create(name) {
        return await BrandModule.create({name})
    }

    async getAll() {
        return await BrandModule.find({})
    }

    async update(name, id) {
        return await BrandModule.findOneAndUpdate({_id: id}, {name}, {new: true})
    }

    async delete(id) {
        await BrandModule.findOneAndDelete({_id: id})

    }
}

module.exports = new BrandService()