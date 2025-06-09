import { IsString, IsOptional, IsBoolean } from 'class-validator';
import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateArtistDto {
  @ApiPropertyOptional({
    example: 'Elvis Presley',
    description: 'Updated artist name',
  })
  @IsString()
  @IsOptional()
  name?: string;

  @ApiPropertyOptional({
    example: false,
    description: 'Updated Grammy status',
  })
  @IsBoolean()
  @IsOptional()
  grammy?: boolean;
}
