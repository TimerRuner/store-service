import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Patch,
    Post,
    Query,
    Req,
    UploadedFiles, UseGuards,
    UseInterceptors
} from '@nestjs/common';
import {CreateDeviceDto} from "./dto/create-device.dto";
import {FileFieldsInterceptor} from "@nestjs/platform-express";
import {DeviceService} from "./device.service";
import {RoleGuard} from "../auth/role.guard";
import {ERole} from "../user/dto/user-create.dto";
import {Roles} from "../auth/role.decorator";

@Controller('device')
export class DeviceController {

    constructor(private readonly deviceService: DeviceService) {}

    checkDtoFiles(file) {
        if(file) return file[0]
        return null
    }

    @Roles(ERole.CREATOR, ERole.MANAGER)
    @UseGuards(RoleGuard)
    @Post("create")
    @UseInterceptors(FileFieldsInterceptor([
        {name: "picture", maxCount: 1}
    ]))
    async createDevice(@Req() req, @UploadedFiles() files, @Body() dto: CreateDeviceDto) {
        const {user} = req
        const {picture} = files

        return await this.deviceService.create(dto, this.checkDtoFiles(picture), user.id)
    }

    @Get("all")
    async getAllDevice(
        @Query("limit") limit: number,
        @Query("offset") offset: number,
        @Query("typeId") typeId?: number | undefined,
        @Query("brandId") brandId?: number | undefined
    ) {
        return this.deviceService.getAll(offset, limit, typeId, brandId)
    }

    @Get("/search/:query")
    async searchDevices(
        @Param("query") query: string,
        @Query("offset") offset: number,
        @Query("limit") limit: number
    ) {
        return await this.deviceService.searchDevice(query, offset, limit)
    }

    @Get("/:id")
    async getOne(@Param("id") id: number){
        return this.deviceService.getOneDevice(id)
    }

    @Roles(ERole.CREATOR, ERole.MANAGER)
    @UseGuards(RoleGuard)
    @Patch("update/:id")
    @UseInterceptors(FileFieldsInterceptor([
        {name: "picture", maxCount: 1}
    ]))
    async updateDevice(@UploadedFiles() files, @Body() dto: CreateDeviceDto, @Param("id") id: number) {
        const {picture} = files
        return this.deviceService.updateDevice(dto, this.checkDtoFiles(picture), id)
    }

    @Roles(ERole.CREATOR, ERole.MANAGER)
    @UseGuards(RoleGuard)
    @Delete("delete/:id")
    async deleteDevice(@Param("id") id: number) {
        return await this.deviceService.deleteDevice(id)
    }
}
