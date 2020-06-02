import { ApiProperty } from '@nestjs/swagger';

export class CategoryDto {
  @ApiProperty()
  readonly id: number;

  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly parent: string;
}
