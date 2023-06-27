import { Module } from '@nestjs/common';
import { DeviceCharacteristicController } from './device_characteristic.controller';
import { DeviceCharacteristicService } from './device_characteristic.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Device} from "../device/device.model";
import {DeviceCharacteristic} from "./device_characteristic.model";

@Module({
  imports: [
    SequelizeModule.forFeature([Device, DeviceCharacteristic]),
  ],
  controllers: [DeviceCharacteristicController],
  providers: [DeviceCharacteristicService],
  exports: [DeviceCharacteristicService]
})
export class DeviceCharacteristicModule {}
