import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Device} from "../device/device.model";
import {Rating} from "./rating.model";
import {TokenModule} from "../token/token.module";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Device,
      User,
      Rating
    ]),
    TokenModule
  ],
  controllers: [RatingController],
  providers: [RatingService],
  exports: [RatingService]
})
export class RatingModule {}
