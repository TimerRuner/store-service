import {Body, Controller, Delete, Get, Param, Patch, Post, UseGuards} from '@nestjs/common';
import {CreateDetailDto} from "./dto/create-detail.dto";
import {UpdateDetailDto} from "./dto/update-detail.dto";
import {DeviceCharacteristicService} from "./device_characteristic.service";
import {Roles} from "../auth/role.decorator";
import {ERole} from "../user/dto/user-create.dto";
import {RoleGuard} from "../auth/role.guard";

@Controller('deviceCharacteristic')
export class DeviceCharacteristicController {
    constructor(private readonly deviceCharacteristicService: DeviceCharacteristicService) {}

    @Post("create")
    async createDetail(@Body() dto: CreateDetailDto) {
        return await this.deviceCharacteristicService.createDetail(dto)
    }

    @Get("all/:deviceId")
    async getAllDetailByDeviceId(@Param('deviceId') deviceId: number) {
        return await this.deviceCharacteristicService.getAllDetailByDeviceId(deviceId)
    }

    @Get("/:id")
    async getOneDetail(@Param("id") id: number) {
        return await this.deviceCharacteristicService.getOneDetail(id)
    }

    @Roles(ERole.CREATOR, ERole.MANAGER)
    @UseGuards(RoleGuard)
    @Patch("update/:id")
    async updateDetail(@Body() dto: UpdateDetailDto, @Param("id") id: number) {
        return await this.deviceCharacteristicService.updateDetail(dto, id)
    }

    @Roles(ERole.CREATOR, ERole.MANAGER)
    @UseGuards(RoleGuard)
    @Delete("delete/:id")
    async deleteDetail(@Param("id") id: number) {
        return await this.deviceCharacteristicService.deleteDetail(id)
    }
}
