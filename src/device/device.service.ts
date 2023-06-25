import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Device} from "./device.model";
import {CreateDeviceDto} from "./dto/create-device.dto";
import {FilesService} from "../files/files.service";
import {ConfigService} from "@nestjs/config";
import {TypeService} from "../type/type.service";
import {BrandService} from "../brand/brand.service";
import {Op} from "sequelize";
import {DeviceCharacteristic} from "../device_characteristic/device_characteristic.model";

@Injectable()
export class DeviceService {
    constructor(
        @InjectModel(Device) private readonly deviceProvider: typeof Device,
        private readonly fileService: FilesService,
        private readonly configService: ConfigService,
        private readonly typeService: TypeService,
        private readonly brandService: BrandService
    ) {}

    async create(dto: CreateDeviceDto, picture, userId) {
        const device = await this.deviceProvider.findOne({where: {name: dto.name}})
        if(device){
            throw new NotFoundException(`Device with name ${dto.name} already exist`)
        }
        if(dto.typeId) {
            const type = await this.typeService.getType(dto.typeId)
            if(!type) dto.typeId = null
        }
        if(dto.brandId) {
            const brand = await this.brandService.getOne(dto.brandId)
            if(!brand) dto.brandId = null
        }

        const pictureSource = await this.fileService.uploadFile(picture, this.configService.get("BUCKET_NAME"))
        return await this.deviceProvider.create({...dto, picture: pictureSource, userId})
    }

    async getAll(offset: number = 0, limit: number = 5) {
        return await this.deviceProvider.findAndCountAll({
            limit,
            offset
        })
    }

    async searchDevice(query: string, offset: number = 0, limit: number = 5) {
        return await this.deviceProvider.findAndCountAll({
            limit,
            offset,
            where: {name: {[Op.iLike]: `%${query}%`}}
        })
    }

    async getOneDevice(id: number) {
        const device = await this.deviceProvider.findOne({where: {id}, include: [DeviceCharacteristic]})
        if(!device) {
            throw new NotFoundException(`Device by id ${id} doesn't exist`)
        }
        return device
    }

    async updateDevice(dto: CreateDeviceDto, picture, id) {
        let pictureSource
        if(!id) {
            throw new BadRequestException("Id doesn't exist")
        }
        const deviceByName = await this.deviceProvider.findOne({where: {name: dto.name}})
        if(deviceByName) {
            throw new BadRequestException(`Device with name ${dto.name} already exist`)
        }

        if(dto.typeId) {
            const type = await this.typeService.getType(dto.typeId)
            if(!type) dto.typeId = null
        }
        if(dto.brandId) {
            const brand = await this.brandService.getOne(dto.brandId)
            if(!brand) dto.brandId = null
        }

        const device = await this.deviceProvider.findOne({where: {id}})
        if(picture){
            await this.fileService.deleteFile(this.configService.get("BUCKET_NAME"), device.picture)
            pictureSource = await this.fileService.uploadFile(picture, this.configService.get("BUCKET_NAME"))
        }
        if (!picture) delete dto.picture

        const [rowsAffected, [updatedDevice]] = await this.deviceProvider.update({...dto, picture: pictureSource}, {where: {id}, returning: true})
        if(!rowsAffected){
            throw new NotFoundException(`Device by id ${id} doesn't exist`)
        }
        return updatedDevice
    }
}
