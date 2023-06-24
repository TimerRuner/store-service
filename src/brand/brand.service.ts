import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Brand} from "./brand.model";
import {CreateBrandDto} from "./dto/create-brand.dto";

@Injectable()
export class BrandService {
    constructor(@InjectModel(Brand) private readonly brandProvider: typeof Brand) {}

    async create(dto: CreateBrandDto){
        return await this.brandProvider.create(dto)
    }

    async getAll() {
        return await this.brandProvider.findAll()
    }

    async getOne(id: number) {
        return await this.brandProvider.findOne({where: {id}})
    }

    async updateBrand(dto: CreateBrandDto, id: number) {
        const [rowsAffected, [updatedBrand]] = await this.brandProvider.update(dto, {where: {id}, returning: true})
        if(!rowsAffected) {
            throw new NotFoundException(`Brand with id ${id} was not found`)
        }
        return updatedBrand
    }

    async deleteBrand(id: number) {
        const brand = await this.getOne(id)
        if(!brand) {
            throw new NotFoundException(`Brand with id ${id} was not found`)
        }
        await this.brandProvider.destroy({where: {id}})
        return `Brand ${brand.name} was deleted successfully`
    }

}
