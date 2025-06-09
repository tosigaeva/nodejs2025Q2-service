import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { ArtistService } from './artist.service';
import { Artist } from './entities/artist.entity';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(private readonly artistService: ArtistService) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    type: [Artist],
  })
  getAll(): Artist[] {
    return this.artistService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  getById(@Param('id', UuidValidationPipe) id: string): Artist {
    return this.artistService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: 201, type: Artist })
  create(@Body() dto: CreateArtistDto): Artist {
    return this.artistService.create(dto.name, dto.grammy);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ): Artist {
    return this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  delete(@Param('id', UuidValidationPipe) id: string): void {
    this.artistService.delete(id);
  }
}
