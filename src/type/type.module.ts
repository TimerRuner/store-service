import { Module } from '@nestjs/common';
import { TypeController } from './type.controller';
import { TypeService } from './type.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Type} from "./type.model";
import {TypeBrand} from "./type-brand.model";
import {Brand} from "../brand/brand.model";
import {Device} from "../device/device.model";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Type, TypeBrand, Brand, Device]),
    TokenModule
  ],
  controllers: [TypeController],
  providers: [TypeService],
  exports: [TypeService]
})
export class TypeModule {}
