import { IsOptional, IsString, IsNumber, IsUUID } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateAlbumDto {
  @ApiPropertyOptional({ example: 'Elvis', description: 'Album name' })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({ example: 1956, description: 'Release year' })
  @IsNumber()
  @IsOptional()
  year?: number;

  @ApiPropertyOptional({ example: null, description: 'Artist ID' })
  @IsUUID()
  @IsOptional()
  artistId?: string | null;
}
