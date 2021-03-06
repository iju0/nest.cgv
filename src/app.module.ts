import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ActorModule } from './actor/actor.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Actor } from './actor/entities/actor.entity';
import { ConfigModule } from '@nestjs/config';
import { FilmModule } from './film/film.module';
import { Film } from './film/entities/film.entity';
import { CinemaModule } from './cinema/cinema.module';
import { Cinema } from './cinema/entities/cinema.entity';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { TransformInterceptor } from './transform.interceptor';
import { ErrorInterceptor } from './error.interceptor';
import { FilmActor } from './film/entities/film-actor.entity';
import { CountryModule } from './country/country.module';
import { Country } from './country/entities/country.entity';
import { FilmCountry } from './film/entities/film-country.entity';
import { SeatModule } from './seat/seat.module';
import { Seat } from './seat/entities/seat.entity';
import { SalesModule } from './sales/sales.module';
import { Sale } from './sales/entities/sale.entity';
import { Genre } from './genre/entities/genre.entity';
import { GenresModule } from './genre/genre.module';
import { DirectorModule } from './director/director.module';
import { Director } from './director/entities/director.entity';
import { FilmDirector } from './film/entities/film-director.entity';
import { FilmGenre } from './film/entities/film-genre.entity';
import { ReservationModule } from './reservation/reservation.module';
import { BillModule } from './bill/bill.module';
import { Reservation } from './reservation/entities/reservation.entity';
import { Bill } from './bill/entities/bill.entity';

@Module({
  imports: [
    ActorModule,
    ConfigModule.forRoot({
      envFilePath: ['.env.dev'],
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DATABASE_HOST || 'localhost',
      port: 3306,
      username: process.env.DATABASE_USERNAME || 'username',
      password: process.env.DATABASE_PASSWORD || 'password',
      database: 'cgv',
      entities: [
        Actor,
        Film,
        Cinema,
        FilmActor,
        Country,
        FilmCountry,
        Seat,
        Sale,
        Genre,
        Director,
        FilmDirector,
        FilmGenre,
        Reservation,
        Bill,
      ],
      synchronize: false,
      logging: true,
    }),
    FilmModule,
    CinemaModule,
    CountryModule,
    SeatModule,
    SalesModule,
    GenresModule,
    DirectorModule,
    ReservationModule,
    BillModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: TransformInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
  ],
})
export class AppModule {}
