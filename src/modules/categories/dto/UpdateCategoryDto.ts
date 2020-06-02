import {
  ApiProperty,
  // ApiPropertyOptional
} from '@nestjs/swagger';
import {
  IsString,
  MinLength,
  IsNotEmpty,
} from 'class-validator';

export class UpdateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  readonly name!: string;
}
