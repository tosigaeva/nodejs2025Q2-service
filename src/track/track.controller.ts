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
import { TrackService } from './track.service';
import { Track } from './entities/track.entity';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Tracks')
@Controller('track')
export class TrackController {
  constructor(private readonly trackService: TrackService) {}

  @Get()
  @ApiOperation({ summary: 'Get all tracks' })
  @ApiResponse({ status: 200, type: [Track] })
  getAll(): Track[] {
    return this.trackService.getAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Get track by ID' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 200, type: Track })
  @ApiResponse({ status: 404, description: 'Track not found' })
  getById(@Param('id', UuidValidationPipe) id: string): Track {
    return this.trackService.getById(id);
  }

  @Post()
  @ApiOperation({ summary: 'Create track' })
  @ApiBody({ type: CreateTrackDto })
  @ApiResponse({ status: 201, type: Track })
  create(@Body() dto: CreateTrackDto): Track {
    return this.trackService.create(
      dto.name,
      dto.duration,
      dto.artistId,
      dto.albumId,
    );
  }

  @Put(':id')
  @ApiOperation({ summary: 'Update track' })
  @ApiParam({ name: 'id', type: String })
  @ApiBody({ type: UpdateTrackDto })
  @ApiResponse({ status: 200, type: Track })
  update(
    @Param('id', UuidValidationPipe) id: string,
    @Body() dto: UpdateTrackDto,
  ): Track {
    return this.trackService.update(id, dto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Delete track' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 204, description: 'Track deleted' })
  delete(@Param('id', UuidValidationPipe) id: string): void {
    this.trackService.delete(id);
  }
}
