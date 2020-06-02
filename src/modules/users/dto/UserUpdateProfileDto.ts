import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNotEmpty, IsNumber, IsDateString } from 'class-validator';

export class UserUpdateProfileDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly name: string;

  @IsDateString()
  @IsNotEmpty()
  @ApiPropertyOptional()
  readonly birthday: string;

  @IsNumber()
  @ApiProperty()
  readonly gender: number;

  @IsNumber()
  @ApiPropertyOptional()
  readonly city: number;

  @IsNumber()
  @ApiProperty()
  readonly job: number;

  @IsString()
  @ApiPropertyOptional()
  readonly about: string;

  @ApiPropertyOptional()
  readonly avatar: string;
}
