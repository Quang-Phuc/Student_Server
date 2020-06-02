import {
  Controller,
  Request,
  Post,
  UseGuards,
  HttpCode,
  HttpStatus,
  Body,
} from '@nestjs/common';
import { ApiTags, ApiBody, ApiResponse } from '@nestjs/swagger';
import { LocalAuthGuard } from '../../guards/local-auth.guard';
import { AuthService } from './auth.service';
import { UserLoginDto } from './dto/userLoginDto';
import { AuthDto } from './dto/authDto';
import { UserRegisterDto } from '../users/dto/UserRegisterDto';
import { UserDto } from '../users/dto/UserDto';
import { UserService } from '../users/user.service';

@ApiTags('Auth')
@Controller()
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  @HttpCode(HttpStatus.CREATED)
  @ApiBody({ type: UserRegisterDto })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Api register',
    type: UserDto,
    status: HttpStatus.OK,
  })
  async register(@Body() usersDto: UserRegisterDto) {
    try {
      const user = await this.userService.registerUser(usersDto);
      return user;
    } catch (error) {
      throw error;
    }
  }

  @Post('/login')
  @UseGuards(new LocalAuthGuard())
  @ApiBody({ type: UserLoginDto })
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    description: 'Api Authen',
    type: AuthDto,
    status: HttpStatus.OK,
  })
  async login(@Request() req) {
    return await this.authService.login(req.user);
  }
}
