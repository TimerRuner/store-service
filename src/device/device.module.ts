import { Module } from '@nestjs/common';
import { DeviceController } from './device.controller';
import { DeviceService } from './device.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Type} from "../type/type.model";
import {TypeBrand} from "../type/type-brand.model";
import {Brand} from "../brand/brand.model";
import {Device} from "./device.model";
import {DeviceCharacteristic} from "../device_characteristic/device_characteristic.model";
import {BasketDevice} from "../basket_device/basket_device.model";
import {Rating} from "../rating/rating.model";
import {FilesModule} from "../files/files.module";
import {User} from "../user/user.model";
import {TokenModule} from "../token/token.module";
import {TypeModule} from "../type/type.module";
import {BrandModule} from "../brand/brand.module";
import {DeviceCharacteristicModule} from "../device_characteristic/device_characteristic.module";
import {RatingModule} from "../rating/rating.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Type, TypeBrand, Brand, Device, DeviceCharacteristic, BasketDevice, Rating, User]),
    TokenModule,
    FilesModule,
    TypeModule,
    BrandModule,
    DeviceCharacteristicModule,
    RatingModule
  ],
  controllers: [DeviceController],
  providers: [DeviceService],
  exports: [DeviceService]
})
export class DeviceModule {}
