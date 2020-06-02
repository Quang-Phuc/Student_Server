import { ApiPropertyOptional } from '@nestjs/swagger';
import { IPaginationOptions } from 'nestjs-typeorm-paginate';

export class PagineteDto implements IPaginationOptions {
  @ApiPropertyOptional()
  readonly page: number = 1;

  @ApiPropertyOptional()
  readonly limit: number = 10;

  @ApiPropertyOptional()
  readonly filter? :string;

  @ApiPropertyOptional()
  readonly order?: string;

  constructor(params: PagineteDto) {
    Object.assign(this, params)
  }
}
