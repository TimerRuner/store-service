import { Module } from '@nestjs/common';
import { BasketController } from './basket.controller';
import { BasketService } from './basket.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "./basket.model";
import {User} from "../user/user.model";
import {BasketDevice} from "../basket_device/basket_device.model";
import {Device} from "../device/device.model";

@Module({
  imports: [
      SequelizeModule.forFeature([Basket, User, BasketDevice, Device])
  ],
  controllers: [BasketController],
  providers: [BasketService]
})
export class BasketModule {}
