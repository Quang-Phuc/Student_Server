import { ApiProperty,
  // ApiPropertyOptional
} from '@nestjs/swagger';
import { IsString,
  MinLength,
  IsNotEmpty,
  // IsNumber
} from 'class-validator';
import { IsUnique } from '../../../validator/isUnique.validator';

export class NewCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  @ApiProperty()
  @IsUnique({
    table: 'categories',
    column: 'name',
  })
  readonly name!: string;

  // @IsNumber()
  // @ApiPropertyOptional()
  // @Expose({
  //   name: 'parent_id'
  // })
  // readonly parentId: number;
}
