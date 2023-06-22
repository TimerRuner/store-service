import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import {SequelizeModule} from "@nestjs/sequelize";
import {Role} from "../role/role.model";
import {User} from "./user.model";
import {Token} from "../token/token.model";
import {Account} from "../account/account.model";
import {RoleModule} from "../role/role.module";
import { TokenModule } from "../token/token.module";
import {Basket} from "../basket/basket.model";
import {Rating} from "../rating/rating.model";

@Module({
  imports: [
      SequelizeModule.forFeature([
          Role,
          User,
          Token,
          Account,
          Basket,
          Rating
      ]),
      RoleModule,
      TokenModule
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService]
})
export class UserModule {}
