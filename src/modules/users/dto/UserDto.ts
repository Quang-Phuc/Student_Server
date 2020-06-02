import { ApiProperty } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty()
  readonly name: string;

  @ApiProperty()
  readonly email: string;

  @ApiProperty()
  readonly phoneNumber: string;

  @ApiProperty()
  readonly role: string;

  constructor(name, email, phoneNumber, role) {
    this.name = name;
    this.email = email;
    this.phoneNumber = phoneNumber;
    this.role = role
  }
}
