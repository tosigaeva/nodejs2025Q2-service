import { forwardRef, Module } from '@nestjs/common';
import { ArtistController } from './artist.controller';
import { ArtistService } from './artist.service';
import { ArtistRepository } from './artist.repository';
import { AlbumModule } from 'src/album/album.module';
import { TrackModule } from '../track/track.module';

@Module({
  imports: [forwardRef(() => AlbumModule), forwardRef(() => TrackModule)],
  controllers: [ArtistController],
  providers: [ArtistService, ArtistRepository],
})
export class ArtistModule {}
