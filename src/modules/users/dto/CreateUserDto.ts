import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsEmail, MinLength, IsNotEmpty } from 'class-validator';

import { IsUnique } from '../../../validator/isUnique.validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsString()
  @IsNotEmpty()
  @IsEmail()
  @IsUnique({
    table: 'users',
    column: 'email',
  })
  @ApiProperty()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly phoneNumber: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role_id: number;
}
