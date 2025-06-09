import { IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdatePasswordDto {
  @ApiProperty({
    example: 'oldPassword123',
    description: 'Current user password',
  })
  @IsString()
  @IsNotEmpty()
  oldPassword: string; // previous password

  @ApiProperty({
    example: 'newStrongPassword456',
    description: 'New password (required)',
  })
  @IsString()
  @IsNotEmpty()
  newPassword: string; // new password
}
