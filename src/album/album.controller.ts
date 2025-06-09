import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AlbumService } from './album.service';
import { Album } from './entities/album.entity';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Albums')
@Controller('album')
export class AlbumController {
  constructor(private readonly albumService: AlbumService) {}

  @Get()
  @ApiOperation({ summary: 'Get all albums' })
  @ApiResponse({ status: 200, type: [Album] })
  getAll(): Album[] {
    return this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  getById(@Param('id', UuidValidationPipe) id: string): Album {
    return this.albumService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({ status: 201, type: Album })
  create(@Body() dto: CreateAlbumDto): Album {
    return this.albumService.create(dto.name, dto.year, dto.artistId ?? null);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({ status: 200, type: Album })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ): Album {
    return this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Album deleted' })
  delete(@Param('id', UuidValidationPipe) id: string): void {
    this.albumService.delete(id);
  }
}
