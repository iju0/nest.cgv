import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DirectorController } from './director.controller';
import { DirectorRepository } from './director.repository';
import { DirectorService } from './director.service';

@Module({
  imports: [TypeOrmModule.forFeature([DirectorRepository])],
  controllers: [DirectorController],
  providers: [DirectorService],
})
export class DirectorModule {}
