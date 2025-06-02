import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  IsUUID,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateAlbumDto {
  @ApiProperty({
    example: 'Elvis for Everyone!',
    description: 'Album name',
  })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 1965,
    description: 'Release year',
  })
  @IsNumber()
  year: number;

  @ApiProperty({
    example: 'f3a6b6a4-8df9-4d88-8b3f-13540dd3c169',
    description: 'Artist ID (optional)',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
