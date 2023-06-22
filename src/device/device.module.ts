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

@Module({
  imports: [
    SequelizeModule.forFeature([Type, TypeBrand, Brand, Device, DeviceCharacteristic, BasketDevice, Rating])
  ],
  controllers: [DeviceController],
  providers: [DeviceService]
})
export class DeviceModule {}
