import { Module } from '@nestjs/common';
import { BasketDeviceController } from './basket_device.controller';
import { BasketDeviceService } from './basket_device.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "../basket/basket.model";
import {User} from "../user/user.model";
import {BasketDevice} from "./basket_device.model";
import {Device} from "../device/device.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Basket, User, BasketDevice, Device])
  ],
  controllers: [BasketDeviceController],
  providers: [BasketDeviceService]
})
export class BasketDeviceModule {}
