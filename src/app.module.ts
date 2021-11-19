import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor/entity/actor.entity';
import { ConfigModule } from '@nestjs/config';
import { FilmModule } from './film/film.module';
import { Film } from "./film/entities/film.entity";

@Module({
  imports: [
    ActorModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST,
      port: 3306,
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: 'cgv',
      entities: [Actor, Film],
      synchronize: false,
    }),
    FilmModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
