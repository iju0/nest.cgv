import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
//import { GenreRespository } from './genre.repository';
import { GenreController } from './genre.controller';
import { GenreService } from './genre.service';
import { Genre } from './entities/genre.entity';

@Module({
  controllers: [GenreController],
  providers: [GenreService],
  imports: [TypeOrmModule.forFeature([Genre])],
})
export class GenresModule {}
