import { Module } from '@nestjs/common';
import { DeviceCharacteristicController } from './device_characteristic.controller';
import { DeviceCharacteristicService } from './device_characteristic.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Device} from "../device/device.model";
import {DeviceCharacteristic} from "./device_characteristic.model";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Device, DeviceCharacteristic]),
    TokenModule
  ],
  controllers: [DeviceCharacteristicController],
  providers: [DeviceCharacteristicService],
  exports: [DeviceCharacteristicService]
})
export class DeviceCharacteristicModule {}
