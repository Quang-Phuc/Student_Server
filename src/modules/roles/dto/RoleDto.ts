import { ApiProperty } from '@nestjs/swagger';

export class RoleDto {
  @ApiProperty()
  readonly name: string;
}
