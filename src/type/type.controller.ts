import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateTypeDto} from "./dto/create-type.dto";
import {TypeService} from "./type.service";
import {Roles} from "../auth/role.decorator";
import {ERole} from "../user/dto/user-create.dto";
import {RoleGuard} from "../auth/role.guard";

@Controller('type')
export class TypeController {
    constructor(private readonly typeService: TypeService) {}
    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Post("create")
    async createType(@Body() dto: CreateTypeDto) {
        return await this.typeService.create(dto)
    }

    @Get("all")
    async getAll() {
        return await this.typeService.getAll()
    }

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Patch("update/:id")
    async updateType(@Body() dto: CreateTypeDto, @Param("id") id: number){
        return await this.typeService.updateType(dto, id)
    }

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Delete("delete/:id")
    async deleteType(@Param("id") id: number){
        return await this.typeService.deleteType(id)
    }
}
