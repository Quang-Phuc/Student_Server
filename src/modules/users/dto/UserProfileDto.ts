import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserProfileDto {
	readonly id: number;

	readonly name: string;

  readonly email: string;

  readonly phoneNumber: string;

	readonly birthday: string;

	readonly gender: number;

	readonly job: number;

	readonly city: number;

	readonly about: string;

	readonly avatar: string;

	readonly isActive: boolean;

	@Exclude()
	readonly password: string;

	@Exclude()
	readonly role_id: string;

	@Exclude()
	readonly confirmationToken: string;

	@Exclude()
	readonly confirmedAt: string;

	@Exclude()
	readonly confirmedSendAt: string;

	@Exclude()
	readonly resetPasswordToken: string;

	@Exclude()
	readonly resetPasswordSentAt: string;

	@Exclude()
	readonly createdDate: string;

	@Exclude()
	readonly deletedAt: string;

	@Exclude()
	readonly updatedAt: string;
}
