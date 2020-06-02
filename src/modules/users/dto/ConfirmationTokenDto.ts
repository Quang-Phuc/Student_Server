import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class ConfirmationUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly token: string;
}
