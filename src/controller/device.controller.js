const ApiError = require("../error/ApiError")
const DeviceService = require("../services/device.service")
const {of} = require("rxjs");

class DeviceController {

    async create(req, res, next) {
        try {
            const { user } = req;
            const { file } = req;
            const dto = req.body

            const device = await DeviceService.create(dto, file, user._id)
            res.json(device)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getAll(req, res, next) {
        try {
            const {typeId, brandId} = req.body
            const {offset, limit} = req.query
            const devices = await DeviceService.getAll(limit, offset, brandId, typeId)
            res.json(devices)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async getOne(req, res, next) {
        try {
            const {id} = req.params
            const device = await DeviceService.getOne(id)
            res.json(device)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async search(req, res, next){
        try {
            const {query} = req.params
            const {limit, offset} = req.query
            const devices = await DeviceService.search(limit, offset, query)
            res.json(devices)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async update(req, res, next){
        try {
            const {id} = req.params
            const { file } = req;
            const dto = req.body
            const device = await DeviceService.update(dto, file, id)
            res.json(device)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }

    async delete(req, res, next){
        try {
            const {id} = req.params
            const device = await DeviceService.delete(id)
            res.json(device)
        } catch (e) {
            next(ApiError.internal(e.message))
        }
    }
}

module.exports = new DeviceController()