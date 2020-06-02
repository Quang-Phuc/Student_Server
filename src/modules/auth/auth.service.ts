import { Injectable, Logger } from '@nestjs/common';
import { UserService } from '../users/user.service';
import { UserEntity } from '../users/user.entity';
import { AuthDto } from './dto/authDto';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly logger = new Logger(AuthService.name);
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<UserEntity> {
    return this.userService.validateUser(email, password);
  }

  async login(userEntity: UserEntity): Promise<AuthDto> {
    const payload = { sub: userEntity.id };
    const user = await userEntity.toUserInfo();
    this.logger.debug(`User #${user.email} login success`)
    return {
      user,
      accessToken: this.jwtService.sign(payload),
    };
  }
}
