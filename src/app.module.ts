import { Module } from '@nestjs/common';
import {ConfigModule} from "@nestjs/config";
import {SequelizeModule} from "@nestjs/sequelize";
import { UserModule } from './user/user.module';
import { TokenModule } from './token/token.module';
import { AccountModule } from './account/account.module';
import { AuthModule } from './auth/auth.module';
import { RoleModule } from './role/role.module';
import {User} from "./user/user.model";
import {Role} from "./role/role.model";
import {Token} from "./token/token.model";
import {Account} from "./account/account.model";
import { BasketModule } from './basket/basket.module';
import { DeviceModule } from './device/device.module';
import { BasketDeviceModule } from './basket_device/basket_device.module';
import { RatingModule } from './rating/rating.module';
import { DeviceCharacteristicModule } from './device_characteristic/device_characteristic.module';
import { TypeModule } from './type/type.module';
import { BrandModule } from './brand/brand.module';
import {Basket} from "./basket/basket.model";
import {Type} from "./type/type.model";
import {TypeBrand} from "./type/type-brand.model";
import {Device} from "./device/device.model";
import {Brand} from "./brand/brand.model";
import {BasketDevice} from "./basket_device/basket_device.model";
import {Rating} from "./rating/rating.model";
import {DeviceCharacteristic} from "./device_characteristic/device_characteristic.model";

@Module({
  imports: [
      ConfigModule.forRoot({
        envFilePath: ".env",
        isGlobal: true
      }),
      SequelizeModule.forRoot({
        dialect: "postgres",
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        username: process.env.DB_USERNAME,
        password: process.env.DB_PASSWORD,
        database: process.env.DB_DATABASE,
        models: [
            User,
            Role,
            Token,
            Account,
            Basket,
            BasketDevice,
            Type,
            TypeBrand,
            Device,
            Brand,
            Rating,
            DeviceCharacteristic
        ],
        autoLoadModels: true,
        synchronize: true,
        logging: true
      }),
      UserModule,
      TokenModule,
      AccountModule,
      AuthModule,
      RoleModule,
      BasketModule,
      DeviceModule,
      BasketDeviceModule,
      RatingModule,
      DeviceCharacteristicModule,
      TypeModule,
      BrandModule,
  ],
})
export class AppModule {}
