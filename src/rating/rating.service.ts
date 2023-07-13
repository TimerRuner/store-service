import {BadRequestException, Injectable, NotFoundException} from '@nestjs/common';
import {CreateRatingDto} from "./dto/create-rating.dto";
import {InjectModel} from "@nestjs/sequelize";
import {Rating} from "./rating.model";
import {where} from "sequelize";

@Injectable()
export class RatingService {

    constructor(@InjectModel(Rating) private readonly ratingProvider: typeof Rating) {}

    async createRating(dto: CreateRatingDto) {
        const rating = await this.ratingProvider.findOne({where: {userId: dto.userId, deviceId: dto.deviceId}})
        if(rating) {
            throw new BadRequestException("Rating already exist for this device")
        }
        return await this.ratingProvider.create(dto)
    }

    async getOneRate(id: number) {
        if(!id) {
            throw new BadRequestException("Id doesn't exist")
        }

        return await this.ratingProvider.findOne({where: {id}})
    }

    async updateRate(rate: number, id: number) {
        const [rowsAffected, [updatedRating]] = await this.ratingProvider.update({rate}, {where: {id}, returning: true})
        if(!rowsAffected) {
            throw new NotFoundException(`Rate doesn't exist`)
        }

        return updatedRating
    }

    async deleteRate(id: number) {
        if(!id) {
            throw new BadRequestException("Id doesn't exist")
        }

        await this.ratingProvider.destroy({where: {id}})
        return `rate by ${id} deleted successfully`
    }

    async deleteByDeviceId(deviceId: number) {
        if(!deviceId) {
            throw new BadRequestException("Id doesn't exist")
        }
        await this.ratingProvider.destroy({where: {deviceId}})
    }
}
