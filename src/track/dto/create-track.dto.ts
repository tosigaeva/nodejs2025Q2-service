import {
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUUID,
  IsNumber,
} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateTrackDto {
  @ApiProperty({ example: 'Forget Me Never', description: 'Track name' })
  @IsString()
  @IsNotEmpty()
  name: string;

  @ApiProperty({
    example: 125,
    description: 'Duration in seconds',
  })
  @IsNumber()
  duration: number;

  @ApiProperty({
    example: 'artist-uuid',
    description: 'Artist ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ApiProperty({
    example: 'album-uuid',
    description: 'Album ID',
    required: false,
  })
  @IsUUID()
  @IsOptional()
  albumId?: string | null;
}
