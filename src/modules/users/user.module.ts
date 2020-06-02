import { Module } from '@nestjs/common';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { JwtStrategy } from '../../strategies/jwt.strategy';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { BullModule } from '@nestjs/bull';
import { UserMailService } from './userMail.service';
import { UserProcessor } from './user.processor';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({ name: 'userProcessor' }),
  ],
  controllers: [UserController],
  providers: [
    UserService,
    JwtStrategy,
    AwsS3Service,
    UserMailService,
    UserProcessor
  ],
  exports: [UserService],
})
export class UserMoudle {}
