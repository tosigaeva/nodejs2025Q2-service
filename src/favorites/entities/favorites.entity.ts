import { ApiProperty } from '@nestjs/swagger';

export class Favorites {
  @ApiProperty({ example: [], description: 'Favorite artists (IDs)' })
  artists: string[];

  @ApiProperty({ example: [], description: 'Favorite albums (IDs)' })
  albums: string[];

  @ApiProperty({ example: [], description: 'Favorite tracks (IDs)' })
  tracks: string[];
}
