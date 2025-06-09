import { ApiProperty } from '@nestjs/swagger';

export class Album {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID v4',
  })
  id: string;

  @ApiProperty({
    example: 'Elvis for Everyone! ',
    description: 'Album name',
  })
  name: string;

  @ApiProperty({
    example: 1965,
    description: 'Year the album was released',
  })
  year: number;

  @ApiProperty({
    example: 'f3a6b6a4-8df9-4d88-8b3f-13540dd3c169',
    description: 'Artist ID (nullable)',
    nullable: true,
  })
  artistId: string | null;
}
