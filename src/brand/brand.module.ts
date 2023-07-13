import { Module } from '@nestjs/common';
import { BrandController } from './brand.controller';
import { BrandService } from './brand.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Type} from "../type/type.model";
import {TypeBrand} from "../type/type-brand.model";
import {Brand} from "./brand.model";
import {Device} from "../device/device.model";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Type, TypeBrand, Brand, Device]),
    TokenModule
  ],
  controllers: [BrandController],
  providers: [BrandService],
  exports: [BrandService]
})
export class BrandModule {}
