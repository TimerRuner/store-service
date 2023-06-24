import {Injectable, NotFoundException} from '@nestjs/common';
import {InjectModel} from "@nestjs/sequelize";
import {Type} from "./type.model";
import {CreateTypeDto} from "./dto/create-type.dto";

@Injectable()
export class TypeService {
    constructor(@InjectModel(Type) private readonly typeProvider: typeof Type) {}

    async create(dto: CreateTypeDto) {
        return await this.typeProvider.create(dto)
    }

    async getAll() {
        return await this.typeProvider.findAll()
    }

    async getType(id: number) {
        return await this.typeProvider.findOne({where: {id}})
    }

    async updateType(dto: CreateTypeDto, id: number){
        const [rowsAffected, [updatedRecords]] = await this.typeProvider.update(dto, {where: {id}, returning: true})
        if(!rowsAffected){
            throw new NotFoundException(`Type with id ${id} was not found`)
        }
        return updatedRecords
    }

    async deleteType(id: number) {
        const type = await this.getType(id)
        if(!type) {
            throw new NotFoundException(`Type with id ${id} was not found`)
        }
        await this.typeProvider.destroy({where: {id}})
        return `Type ${type.name} was deleted successfully`
    }
}
