import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateBrandDto} from "./dto/create-brand.dto";
import {BrandService} from "./brand.service";
import {Roles} from "../auth/role.decorator";
import {ERole} from "../user/dto/user-create.dto";
import {RoleGuard} from "../auth/role.guard";

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Post("create")
    async createBrand(@Body() dto: CreateBrandDto) {
        return await this.brandService.create(dto)
    }

    @Get("all")
    async getAll(){
        return await this.brandService.getAll()
    }

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Patch("update/:id")
    async updateBrand(@Body() dto: CreateBrandDto, @Param("id") id: number){
        return await this.brandService.updateBrand(dto, id)
    }

    @Roles(ERole.CREATOR)
    @UseGuards(RoleGuard)
    @Delete("delete/:id")
    async deleteBrand(@Param("id") id: number) {
        return await this.brandService.deleteBrand(id)
    }
}
