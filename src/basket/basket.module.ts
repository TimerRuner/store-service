import { Module } from '@nestjs/common';
import { BasketService } from './basket.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "./basket.model";
import {User} from "../user/user.model";
import {BasketDevice} from "../basket_device/basket_device.model";
import {Device} from "../device/device.model";
import { BasketController } from './basket.controller';
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
      SequelizeModule.forFeature([Basket, User, BasketDevice, Device]),
      TokenModule
  ],
  providers: [BasketService],
  exports: [BasketService],
  controllers: [BasketController]
})
export class BasketModule {}
