import {BadRequestException, Injectable} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Basket} from "./basket.model";
import {BasketDevice} from "../basket_device/basket_device.model";
import {Device} from "../device/device.model";

@Injectable()
export class BasketService {
    constructor(@InjectModel(Basket) private readonly basketProvider: typeof Basket) {}
    async createBasket(userId: number) {
        return await this.basketProvider.create({userId})
    }

    async getBasket(userId: number){
        if(!userId) {
            throw new BadRequestException("User id doesn't exist")
        }
        return await this.basketProvider.findOne({
            where: {userId},
            include: [
                { model: BasketDevice, include: [Device] }
            ]
        })
    }

    async deleteBasket(userId: number){
        if(!userId) {
            throw new BadRequestException("Id doesn't exist")
        }
        await this.basketProvider.destroy({where: {userId}})
        return `Basket with id ${userId} doesn't exist`
    }
}
