import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as cookieParser from "cookie-parser";
import * as cors from "cors"
import * as process from "process";
import {Sequelize} from "sequelize-typescript";

async function start() {
  const PORT = process.env.PORT || 5000
  const UI_ORIGIN = process.env.UI_ORIGIN || "http://localhost:3000"
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser())
  app.use(cors({
    origin: UI_ORIGIN,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
  }))
  const sequelize = app.get<Sequelize>(Sequelize);
  await sequelize.sync();

  app.setGlobalPrefix("api")
  await app.listen(PORT, () => console.log(`Server starts at http://localhost:${PORT}`));
}

start();
