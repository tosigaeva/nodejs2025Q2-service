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
import { LoggingService } from '../logging/logging.service';

@ApiTags('Artists')
@Controller('artist')
export class ArtistController {
  constructor(
    private readonly artistService: ArtistService,
    private readonly loggingService: LoggingService,
  ) {}

  @Get()
  @ApiOperation({ summary: 'Get all artists' })
  @ApiResponse({
    status: 200,
    type: [Artist],
  })
  async getAll() {
    this.loggingService.log('Getting all artists', 'Artists');

    return await this.artistService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get artist by ID' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async getById(@Param('id', UuidValidationPipe) id: string) {
    this.loggingService.log(`Getting artist by id: ${id}`, 'Artists');

    return await this.artistService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create artist' })
  @ApiBody({ type: CreateArtistDto })
  @ApiResponse({ status: 201, type: Artist })
  async create(@Body() dto: CreateArtistDto) {
    this.loggingService.log(`Creating artist: ${dto.name}`, 'Artists');
    return await this.artistService.create(dto.name, dto.grammy);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update artist' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiBody({ type: UpdateArtistDto })
  @ApiResponse({ status: 200, type: Artist })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateArtistDto,
  ) {
    this.loggingService.log(`Updating artist: ${id}`, 'Artists');

    return await this.artistService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete artist' })
  @ApiParam({ name: 'id', type: String, description: 'UUID v4' })
  @ApiResponse({ status: 204 })
  @ApiResponse({ status: 400, description: 'Invalid UUID' })
  @ApiResponse({ status: 404, description: 'Artist not found' })
  async delete(@Param('id', UuidValidationPipe) id: string) {
    this.loggingService.log(`Removing artist: ${id}`, 'Artists');
    await this.artistService.delete(id);
  }
}
