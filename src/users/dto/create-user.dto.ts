import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNotEmpty, IsString, MinLength } from 'class-validator';

export class CreateUserDto {
  @ApiProperty({ example: 'John', description: 'First name of the user' })
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @ApiProperty({ example: 'Doe', description: 'Last name of the user' })
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @ApiProperty({
    example: 'user@example.com',
    description: 'Email of the user',
  })
  @Transform((val) => val.value.toLowerCase())
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @ApiProperty({
    example: 'Happy Birthday Dad!',
    description: 'Wishes of the the user',
  })
  @IsNotEmpty()
  @MinLength(10)
  @IsString()
  message: string;
}

export interface IUser {
  id?: string;
  first_name: string;
  last_name: string;
  email: string;
  message: string;
}

export interface UserFilter {
  name?: string;
  email?: string;
  start_date?: string;
  end_date?: string;
  isPaginate?: boolean;
  size?: number;
  page?: number;
}
