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
        models: [User, Role, Token, Account],
        autoLoadModels: true,
        synchronize: true,
        logging: true
      }),
      UserModule,
      TokenModule,
      AccountModule,
      AuthModule,
      RoleModule,
  ],
})
export class AppModule {}
