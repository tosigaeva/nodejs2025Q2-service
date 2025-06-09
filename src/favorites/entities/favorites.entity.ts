import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '../../artist/entities/artist.entity';
import { Album } from '../../album/entities/album.entity';
import { Track } from '../../track/entities/track.entity';

export class Favorites {
  @ApiProperty({ example: [], description: 'Favorite artists (IDs)' })
  artists: Artist[];

  @ApiProperty({ example: [], description: 'Favorite albums (IDs)' })
  albums: Album[];

  @ApiProperty({ example: [], description: 'Favorite tracks (IDs)' })
  tracks: Track[];
}
