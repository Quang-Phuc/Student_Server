import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UserResetPassswordDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly confirmPassword: string;

  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
