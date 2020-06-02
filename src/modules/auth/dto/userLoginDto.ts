import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class UserLoginDto {
  @IsNotEmpty()
  @ApiProperty()
  readonly email: string;

  @IsNotEmpty()
  @ApiProperty()
  readonly password: string;
}
