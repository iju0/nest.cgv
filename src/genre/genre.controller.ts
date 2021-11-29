import { Body, Controller, Delete, Get, Param, Patch, Post, UsePipes, ValidationPipe } from '@nestjs/common';
//import { GenreStatus } from './genre.status.enum';
import { GenreService } from './genre.service';
import { CreateGenreDto } from './dto/create-genre.dto';
//import { GenreStatusValidationPipe } from './pipes/genre-status-validation.pipe';
import { Genre } from './entities/genre.entity';


@Controller('Genres')
export class GenreController {
    constructor(private genresService : GenreService) {}

    // @Get()
    // getAllBoard(): Board[] {
    //     return this.boardsService.getAllBoards();
    // }
    
    @Post()
    @UsePipes(ValidationPipe)
    createGenre( @Body() createGenreDto: CreateGenreDto ) : Promise<Genre> {
        return this.genresService.createGenre(createGenreDto);
    }

    @Get('/:id')
    getGenreById(@Param('id') id: number) : Promise<Genre> {
        return this.genresService.getGenreById(id);
    }

    // @Delete('/:id')
    // deleteBoard(@Param('id') id: string): void{
    //     this.boardsService.deleteBoard(id);
    // }

    // @Patch('/:id/status')
    // updateBoardSatus(
    //     @Param('id') id: string,
    //     @Body('status',GenreStatusValidationPipe) status: BoardStatus,
    // ) {
    //     return this.boardsService.updateBoardStatus(id,status);
    // }
}