import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserEntity } from '../users/user.entity';
import { AuthController } from '../auth/auth.controller';
import { AuthService } from '../auth/auth.service';
import { UserService } from '../users/user.service';
import { LocalStrategy } from '../../strategies/local.strategy';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { ConfigService } from '../../shared/config/config.service';
import { BullModule } from '@nestjs/bull';
import { UserMailService } from 'modules/users/userMail.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserEntity]),
    BullModule.registerQueue({ name: 'userProcessor' }),
    PassportModule,
    JwtModule.register({
      secret: ConfigService.getJwtSecret(),
      signOptions: { expiresIn: '7d' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    UserService,
    LocalStrategy,
    UserMailService,
  ],
})
export class AuthModule {}
