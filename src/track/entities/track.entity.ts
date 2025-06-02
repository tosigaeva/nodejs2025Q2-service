import { ApiProperty } from '@nestjs/swagger';

export class Track {
  @ApiProperty({
    example: '3f4c59cc-5a02-4bcb-9f93-d2d2e78d40c1',
    description: 'UUID v4',
  })
  id: string;

  @ApiProperty({
    example: 'Forget Me Never',
    description: 'Track name',
  })
  name: string;

  @ApiProperty({
    example: 'a1b2c3d4-5678-9101-1121-314151617181',
    description: 'Artist ID (nullable)',
    nullable: true,
  })
  artistId: string | null;

  @ApiProperty({
    example: 'b2d3e4f5-6789-0101-1213-141516171819',
    description: 'Album ID (nullable)',
    nullable: true,
  })
  albumId: string | null;

  @ApiProperty({
    example: 125,
    description: 'Track duration in seconds',
  })
  duration: number;
}
