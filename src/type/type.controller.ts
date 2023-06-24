import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateTypeDto} from "./dto/create-type.dto";
import {TypeService} from "./type.service";

@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) {}
    @Post("create")
    async createType(@Body() dto: CreateTypeDto) {
        return await this.typeService.create(dto)
    }

    @Get("all")
    async getAll() {
        return await this.typeService.getAll()
    }

    @Patch("update/:id")
    async updateType(@Body() dto: CreateTypeDto, @Param("id") id: number){
        return await this.typeService.updateType(dto, id)
    }

    @Delete("delete/:id")
    async deleteType(@Param("id") id: number){
        return await this.typeService.deleteType(id)
    }
}
