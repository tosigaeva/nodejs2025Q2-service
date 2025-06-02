import { IsOptional, IsString, IsUUID, IsNumber } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateTrackDto {
  @ApiPropertyOptional({
    example: '"I Met Her Today',
    description: 'Track name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 162, description: 'Duration in seconds' })
  @IsNumber()
  @IsOptional()
  duration?: number;

  @ApiPropertyOptional({ example: 'artist-uuid', description: 'Artist ID' })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;

  @ApiPropertyOptional({ example: 'album-uuid', description: 'Album ID' })
  @IsUUID()
  @IsOptional()
  albumId?: string | null;
}
