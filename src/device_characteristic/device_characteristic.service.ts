import {BadRequestException, Body, Delete, Get, Injectable, Param, Patch} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {DeviceCharacteristic} from "./device_characteristic.model";
import {CreateDetailDto} from "./dto/create-detail.dto";
import {UpdateDetailDto} from "./dto/update-detail.dto";

@Injectable()
export class DeviceCharacteristicService {
    constructor(
        @InjectModel(DeviceCharacteristic) private readonly deviceCharacteristicProvider: typeof DeviceCharacteristic,
    ) {}

    async createDetail(dto: CreateDetailDto) {
        return await this.deviceCharacteristicProvider.create(dto)
    }

    async getAllDetailByDeviceId(deviceId: number) {
        if(!deviceId){
            throw new BadRequestException("deviceId doesn't exist")
        }

        return await this.deviceCharacteristicProvider.findAll({where: {deviceId}})
    }


    async getOneDetail(id: number) {
        if(!id){
            throw new BadRequestException("id doesn't exist")
        }
        return await this.deviceCharacteristicProvider.findOne({where: {id}})
    }

    async updateDetail(dto: UpdateDetailDto, id: number) {
        const [rowsAffected, [updatedDetails]] = await this.deviceCharacteristicProvider.update(dto, {where: {id}, returning: true})
        if(!rowsAffected) {
            throw new BadRequestException(`Detail with id ${id} doesn't exist`)
        }
        return updatedDetails
    }

    async deleteDetail(id: number) {
        if(!id){
            throw new BadRequestException("device characteristic id doesn't exist")
        }
        await this.deviceCharacteristicProvider.destroy({where: {id}})
        return `Device detail with id ${id} was deleted successfully`
    }

    async deleteByDeviceId(deviceId: number) {
        if(!deviceId){
            throw new BadRequestException("deviceId doesn't exist")
        }
        await this.deviceCharacteristicProvider.destroy({where: {deviceId}})
    }
}
