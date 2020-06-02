import { ApiProperty } from '@nestjs/swagger';
import { UserDto } from '../../users/dto/UserDto';

export class AuthDto {
  @ApiProperty()
  accessToken: string;

  @ApiProperty()
  readonly user: UserDto;
}
