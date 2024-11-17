import { PartialType } from '@nestjs/mapped-types';
import { CreateUserDto } from './create-user.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UpdateUserResponseDto {
  @ApiProperty({
    required: false,
    example: 'John',
    description: 'First name of the user',
  })
  first_name?: string;

  @ApiProperty({
    required: false,
    example: 'Doe',
    description: 'Last name of the user',
  })
  last_name?: string;

  @ApiProperty({
    required: false,
    example: 'user@example.com',
    description: 'Email of the user',
  })
  email?: string;

  @ApiProperty({
    example: 'Happy Birthday Dad!',
    description: 'Wishes of the the user',
  })
  message?: string;
}
