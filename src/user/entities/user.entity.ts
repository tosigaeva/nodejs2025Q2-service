import { ApiProperty } from '@nestjs/swagger';

export class User {
  @ApiProperty({
    example: '123e4567-e89b-12d3-a456-426614174000',
    description: 'UUID v4',
  })
  id: string; // uuid v4

  @ApiProperty({
    example: 'john_john',
    description: 'User login',
  })
  login: string;

  password: string;

  @ApiProperty({
    example: 1,
    description: 'Version number (increments on update)',
  })
  version: number; // integer number, increments on update

  @ApiProperty({
    example: 1655000000,
    description: 'Timestamp of creation',
  })
  createdAt: number; // timestamp of creation

  @ApiProperty({
    example: 1655000000,
    description: 'Timestamp of last update',
  })
  updatedAt: number; // timestamp of last update
}
