import {
  Controller,
  Get,
  Param,
  Post,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { Favorites } from './entities/favorites.entity';
import { UuidValidationPipe } from '../pipes/uuid-validation.pipe';
import { ApiTags, ApiOperation, ApiResponse, ApiParam } from '@nestjs/swagger';

@ApiTags('Favorites')
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: 'Get all favorites' })
  @ApiResponse({ status: 200, type: [Favorites] })
  async getAll() {
    return await this.favoritesService.getAll();
  }

  @Post('track/:id')
  @ApiOperation({ summary: 'Add track to favorites' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 201 })
  async addTrack(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.addTrack(id);
  }

  @Delete('track/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove track from favorites' })
  @ApiResponse({ status: 204 })
  async removeTrack(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.removeTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: 'Add album to favorites' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({ status: 201 })
  async addAlbum(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.addAlbum(id);
  }

  @Delete('album/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove album from favorites' })
  @ApiResponse({ status: 204 })
  async removeAlbum(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.removeAlbum(id);
  }

  @Post('artist/:id')
  @ApiOperation({ summary: 'Add artist to favorites' })
  @ApiParam({ name: 'id', type: String })
  @ApiResponse({
    status: 201,
    description: 'Artist added to favorites',
    type: Favorites,
  })
  @ApiResponse({ status: 400, description: 'Invalid UUID.' })
  @ApiResponse({ status: 422, description: 'Artist not found' })
  async addArtist(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.addArtist(id);
  }

  @Delete('artist/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiOperation({ summary: 'Remove artist from favorites' })
  @ApiResponse({ status: 204 })
  async removeArtist(@Param('id', UuidValidationPipe) id: string) {
    await this.favoritesService.removeArtist(id);
  }
}
