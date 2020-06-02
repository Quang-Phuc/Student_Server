import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException, ForbiddenException } from '@nestjs/common';
import { AuthService } from '../modules/auth/auth.service';
import { isNil } from 'lodash';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    });
  }

  async validate(email, password): Promise<any> {
    try {
      const user = await this.authService.validateUser(email, password);

      if (isNil(user)) {
        throw new UnauthorizedException();
      }

      if (!user.isActive) {
        throw new ForbiddenException('Your account not active!!!');
      }
      return user;
    } catch (error) {
      throw error;
    }
  }
}
