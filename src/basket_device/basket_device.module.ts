import { Module } from '@nestjs/common';
import { BasketDeviceController } from './basket_device.controller';
import { BasketDeviceService } from './basket_device.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Basket} from "../basket/basket.model";
import {User} from "../user/user.model";
import {BasketDevice} from "./basket_device.model";
import {Device} from "../device/device.model";
import {UserModule} from "../user/user.module";
import {BasketModule} from "../basket/basket.module";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Basket, User, BasketDevice, Device]),
    UserModule,
    BasketModule,
    TokenModule
  ],
  controllers: [BasketDeviceController],
  providers: [BasketDeviceService]
})
export class BasketDeviceModule {}
