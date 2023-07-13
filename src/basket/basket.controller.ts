import {Body, Controller, Get, Post, Req, UseGuards} from '@nestjs/common';
import {BasketService} from "./basket.service";
import {AuthGuard} from "../auth/auth.guard";

@Controller('basket')
export class BasketController {
    constructor(private readonly basketService: BasketService) {}
    @UseGuards(AuthGuard)
    @Post("create")
    async createBasket(@Req() req) {
        const {user} = req
        return await this.basketService.createBasket(user.id)
    }
    @UseGuards(AuthGuard)
    @Get("get")
    async getBasketDevices(@Req() req) {
        const {user} = req
        return await this.basketService.getBasket(user.id)
    }
}
