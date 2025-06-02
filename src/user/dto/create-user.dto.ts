import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({
    example: 'john_john',
    description: 'User login (required)',
  })
  @IsString()
  @IsNotEmpty()
  login: string;

  @ApiProperty({
    example: 'strongPassword123',
    description: 'User password (required)',
  })
  @IsString()
  @IsNotEmpty()
  password: string;
}
