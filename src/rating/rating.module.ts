import { Module } from '@nestjs/common';
import { RatingController } from './rating.controller';
import { RatingService } from './rating.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {User} from "../user/user.model";
import {Device} from "../device/device.model";

@Module({
  imports: [
    SequelizeModule.forFeature([
      Device,
      User
    ]),
  ],
  controllers: [RatingController],
  providers: [RatingService]
})
export class RatingModule {}
