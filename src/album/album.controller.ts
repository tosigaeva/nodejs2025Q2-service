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
  async getAll(): Promise<Album[]> {
    return await this.albumService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get album by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Album })
  @ApiResponse({ status: 404, description: 'Album not found' })
  async getById(@Param('id', UuidValidationPipe) id: string): Promise<Album> {
    return await this.albumService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create album' })
  @ApiBody({ type: CreateAlbumDto })
  @ApiResponse({ status: 201, type: Album })
  async create(@Body() dto: CreateAlbumDto): Promise<Album> {
    return await this.albumService.create(
      dto.name,
      dto.year,
      dto.artistId ?? null,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update album' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateAlbumDto })
  @ApiResponse({ status: 200, type: Album })
  async update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateAlbumDto,
  ): Promise<Album> {
    return await this.albumService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete album' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Album deleted' })
  async delete(@Param('id', UuidValidationPipe) id: string) {
    await this.albumService.delete(id);
  }
}
