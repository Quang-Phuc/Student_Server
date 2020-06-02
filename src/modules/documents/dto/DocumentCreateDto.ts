import { ApiProperty } from '@nestjs/swagger';
import { IsString, IsBoolean, IsNotEmpty, IsNumber } from 'class-validator';

export class DocumentCreateDto {
  @IsString()
  @IsNotEmpty()
  @ApiProperty()
  readonly file: string;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly type: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly major: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly subMajor: number;

  @IsNumber()
  @IsNotEmpty()
  @ApiProperty()
  readonly language: number;

  @IsString()
  @ApiProperty()
  readonly university: string;

  @IsNumber()
  @ApiProperty()
  readonly price: number;

  @IsNumber()
  @ApiProperty()
  readonly startPagePreview: number;

  @IsNumber()
  @ApiProperty()
  readonly endPagePreview: number;

  @IsBoolean()
  @ApiProperty()
  readonly isVip: boolean;

  @IsString()
  @ApiProperty()
  readonly description: string;
}
