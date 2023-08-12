const RatingModel = require("../models/rating")

class RatingService {
    async create(dto) {
        const rating = await RatingModel.findOne({userId: dto.userId, deviceId: dto.deviceId})
        console.log(rating)
        if(rating){
            throw new Error("Rating already exist for this device")
        }

        return await RatingModel.create(dto)
    }

    async getOne(id) {
        if(!id) {
            throw new Error("Id unexist")
        }

        return await RatingModel.findById(id)
    }

    async update(dto, id) {
        if(!id) {
            throw new Error("Id unexist")
        }

        return await RatingModel.findOneAndUpdate({_id: id}, dto, {new: true})
    }

    async delete(id) {
        if(!id) {
            throw new Error("Id unexist")
        }
        return await RatingModel.findOneAndDelete({_id: id})
    }

    async deleteByDeviceId(deviceId) {
        if(!deviceId) {
            throw new Error("Id unexist")
        }
        return await RatingModel.findOneAndDelete({deviceId})
    }
}

module.exports = new RatingService()