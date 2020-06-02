import { ApiProperty } from '@nestjs/swagger';
import { IsString, MinLength, IsNotEmpty } from 'class-validator';


export class UserUpdatePassswordDto {

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly currentPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly newPassword: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(6)
  @ApiProperty()
  readonly confimrmPassword: string;

}
