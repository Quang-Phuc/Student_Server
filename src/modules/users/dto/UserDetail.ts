import { ApiProperty } from '@nestjs/swagger';
import { UserEntity } from '../user.entity';

export class UserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly role: string;

  constructor(user: UserEntity) {
    this.name = user.name;
    this.email = user.email;
    this.phoneNumber = user.phoneNumber;
    this.role = user.role.name;
  }
}
