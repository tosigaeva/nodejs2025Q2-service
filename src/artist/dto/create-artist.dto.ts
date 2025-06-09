import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateArtistDto {
  @ApiProperty({
    example: 'Elvis Presley',
    description: 'Artist name (required)',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: true,
    description: 'Whether artist has a Grammy (required)',
  })
  @IsBoolean()
  grammy: boolean;
}
