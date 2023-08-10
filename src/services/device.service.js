const FileService = require("../services/file.service")
const DeviceModel = require("../models/device")
const TypeService = require("../services/type.service")
const BrandService = require("../services/brand.service")
const RatingService = require("../services/rating.service")
const DeviceDetailService = require("../services/device_characteristic.service")

class DeviceService {
    async create(dto, picture, userId) {
        const device = await DeviceModel.findOne({name: dto.name})
        if(device){
            throw new Error("Device already exist")
        }
        if(dto.typeId) {
           const type = await TypeService.getOne(dto.typeId)
           if(!type) dto.typeId = null
        }
        if(dto.brandId) {
            const brand = await BrandService.getOne(dto.brandId)
            if(!brand) dto.brandId = null
        }
        const pictureSource = await FileService.uploadFile(picture, process.env.BUCKET_NAME)
        return await DeviceModel.create({...dto, picture: pictureSource, userId})
    }

    async getAll(limit = 5, offset = 0, brandId, typeId) {
        let devices, count
        if(typeId && brandId) {
            devices = await DeviceModel.find({brandId, typeId}, null, { skip: offset, limit })
            count = await DeviceModel.countDocuments({brandId, typeId});
        } else if(typeId){
            devices = await DeviceModel.find({typeId}, null, { skip: offset, limit })
            count = await DeviceModel.countDocuments({typeId});
        } else if(brandId){
            devices = await DeviceModel.find({brandId}, null, { skip: offset, limit })
            count = await DeviceModel.countDocuments({brandId});
        } else {
            devices = await DeviceModel.find({}, null, { skip: offset, limit })
            count = await DeviceModel.countDocuments({});
        }
        return {devices, count}
    }

    async getOne(id) {
        if(!id) {
            throw new Error("Id doesn't exist")
        }
        return await DeviceModel.findOne({_id: id})
    }

    async search(limit, offset, query) {
        const regexQuery = new RegExp(query, 'i');
        const devices =  await DeviceModel.find({name: regexQuery}, null, {skip: offset, limit})
        const count = await DeviceModel.countDocuments({name: regexQuery})
        return {devices, count}
    }

    async update(dto, picture, id){
        let pictureSource
        const device = await DeviceModel.findOne({name: dto.name})
        if(device){
            throw new Error("Device already exist")
        }
        if(dto.typeId) {
            const type = await TypeService.getOne(dto.typeId)
            if(!type) dto.typeId = null
        }
        if(dto.brandId) {
            const brand = await BrandService.getOne(dto.brandId)
            if(!brand) dto.brandId = null
        }
        const deviceForUpdate = await DeviceModel.find({_id: id})
        if(picture){
            await FileService.deleteFile(process.env.BUCKET_NAME, deviceForUpdate.picture)
            pictureSource = await FileService.uploadFile(picture, process.env.BUCKET_NAME)
        }
        if (!picture) delete dto.picture
        return await DeviceModel.findOneAndUpdate({ _id: id }, { ...dto, picture: pictureSource }, { new: true })
    }

    async delete(id) {
        await DeviceModel.findOneAndDelete({_id: id})
        await DeviceDetailService.deleteByDeviceId(id)
        await RatingService.deleteByDeviceId(id)
        return `Deleted device successfully`
    }

}

module.exports = new DeviceService()