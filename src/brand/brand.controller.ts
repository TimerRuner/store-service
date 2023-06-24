import {Body, Controller, Delete, Get, Param, Patch, Post} from '@nestjs/common';
import {CreateBrandDto} from "./dto/create-brand.dto";
import {BrandService} from "./brand.service";

@Controller('brand')
export class BrandController {
    constructor(private readonly brandService: BrandService) {}

    @Post("create")
    async createBrand(@Body() dto: CreateBrandDto) {
        return await this.brandService.create(dto)
    }

    @Get("all")
    async getAll(){
        return await this.brandService.getAll()
    }

    @Patch("update/:id")
    async updateBrand(@Body() dto: CreateBrandDto, @Param("id") id: number){
        return await this.brandService.updateBrand(dto, id)
    }

    @Delete("delete/:id")
    async deleteBrand(@Param("id") id: number) {
        return await this.brandService.deleteBrand(id)
    }
}
