import { IsUniqueValidator } from './isUnique.validator';
import { IsValidUsernameValidator } from './isValidUsername.validator';
import { Module } from '@nestjs/common';

@Module({
  providers: [IsUniqueValidator, IsValidUsernameValidator],
})
export class ValidatorsModule {}
