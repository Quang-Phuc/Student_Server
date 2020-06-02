import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsNotEmpty } from 'class-validator';

export class UpdateUserDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly role_id: number;
}
