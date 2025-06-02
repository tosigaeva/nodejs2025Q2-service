import { ApiProperty } from '@nestjs/swagger';

export class Artist {
  @ApiProperty({
    example: 'd290f1ee-6c54-4b01-90e6-d701748f0851',
    description: 'UUID v4',
  })
  id: string;

  @ApiProperty({
    example: 'Elvis Presley',
    description: 'Artist name',
  })
  name: string;

  @ApiProperty({
    example: true,
    description: 'Does the artist have a Grammy award?',
  })
  grammy: boolean;
}
