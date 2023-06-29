import {Body, Controller, Delete, Get, Param, Post, Req, UseGuards} from '@nestjs/common';
import {BasketDeviceCrateDto} from "./dto/basket-device-crate.dto";
import {BasketDeviceService} from "./basket_device.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('basket-device')
export class BasketDeviceController {
    constructor(private readonly basketDeviceService: BasketDeviceService) {}

    @UseGuards(AuthGuard)
    @Post("create")
    async createBasketDevice(@Req() req, @Body() dto: BasketDeviceCrateDto) {
        const {user} = req
        return await this.basketDeviceService.create(dto.deviceId, user.id)
    }

    @UseGuards(AuthGuard)
    @Get("get/:id")
    async getOneBasketDevice(@Param("id") id: number) {
        return await this.basketDeviceService.getOneDevice(id)
    }

    @UseGuards(AuthGuard)
    @Delete("delete/:id")
    async deleteOneDevice(@Param("id") id: number) {
        return await this.basketDeviceService.deleteDevice(id)
    }


}
