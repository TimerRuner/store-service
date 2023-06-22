import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Type} from "./type.model";
import {TypeBrand} from "./type-brand.model";
import {Brand} from "../brand/brand.model";
import {Device} from "../device/device.model";

@Module({
  imports: [
      SequelizeModule.forFeature([Type, TypeBrand, Brand, Device])
  ],
  controllers: [TypeController],
  providers: [TypeService]
})
export class TypeModule {}
