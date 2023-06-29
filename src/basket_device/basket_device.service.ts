import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {BasketDevice} from "./basket_device.model";
import {BasketService} from "../basket/basket.service";
import {Device} from "../device/device.model";

@Injectable()
export class BasketDeviceService {
    constructor(
        @InjectModel(BasketDevice) private readonly basketDeviceProvider: typeof BasketDevice,
        private readonly basketService: BasketService
    ) {}
    async create(deviceId: number, userId: number) {
        const basket = await this.basketService.getBasket(userId)
        return await this.basketDeviceProvider.create({deviceId, basketId: basket.id})
    }

    async getOneDevice(id: number) {
        if(!id) {
            throw new BadRequestException("Id doesn't exist")
        }
        return await this.basketDeviceProvider.findOne({where: {id}, include: [Device]})
    }

    async deleteDevice(id: number) {
        if(!id) {
            throw new BadRequestException("Id doesn't exist")
        }
        await this.basketDeviceProvider.destroy({where: {id}})
        return `Device with ${id} was deleted from basket`
    }
}
