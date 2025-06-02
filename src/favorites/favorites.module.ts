import { Module } from '@nestjs/common';
import { FavoritesController } from './favorites.controller';
import { FavoritesService } from './favorites.service';
import { TrackRepository } from '../track/track.repository';
import { AlbumRepository } from '../album/album.repository';
import { ArtistRepository } from '../artist/artist.repository';

@Module({
  controllers: [FavoritesController],
  providers: [
    FavoritesService,
    TrackRepository,
    AlbumRepository,
    ArtistRepository,
  ],
})
export class FavoritesModule {}
