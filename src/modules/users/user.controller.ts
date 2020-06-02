import { Controller, Request, UseGuards, Get, Post, Body, Res, HttpStatus, HttpCode, Patch, Param, Logger } from '@nestjs/common';
import { ApiTags, ApiCreatedResponse, ApiBearerAuth, ApiBody, ApiResponse, ApiParam } from '@nestjs/swagger';
import { Response } from 'express';
import { plainToClass } from 'class-transformer';
import { UserService } from './user.service';
import { UserDto } from './dto/UserDto';
import { JwtAuthGuard } from '../../guards/jwt-auth.guard';
import { UserUpdatePassswordDto } from './dto/UserUpdatePasswordDto';
import { UserForgotPassswordDto } from './dto/UserForgotPasswordDto';
import { UserResetPassswordDto } from './dto/UserResetPasswordDto';
import { ConfirmationUserDto } from './dto/ConfirmationTokenDto';
import { UserUpdateProfileDto } from './dto/UserUpdateProfileDto';
import { UserEntity } from './user.entity';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { UserProfileDto } from './dto/UserProfileDto';

@ApiTags('Users')
@ApiBearerAuth()
@Controller()
export class UserController {
  private readonly logger = new Logger(UserController.name);
  constructor(private readonly userService: UserService) {}

  @Get('/me')
  @ApiResponse({ status: HttpStatus.OK, description: 'Get user success' })
  @ApiResponse({ status: HttpStatus.UNAUTHORIZED, description: 'UNAUTHORIZED' })
  @ApiCreatedResponse({ type: UserDto })
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      const { id } = req.user;
      const userEntity = await this.userService.findOne(id);
      return plainToClass(UserProfileDto, userEntity);
    } catch (error) {
      throw error;
    }
  }

  @Patch('/updateProfile')
  @ApiBody({ type: UserUpdateProfileDto })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Update user success',
  })
  @UseGuards(JwtAuthGuard)
  async updateProfile(
    @Request() req,
    @Body() userUpdateProfile: UserUpdateProfileDto,
  ) {
    try {
      const { id } = req.user;
      await this.userService.updateUserProfile(id, userUpdateProfile);
      const user = await this.userService.findOne(id);
      return plainToClass(UserProfileDto, user);
    } catch (error) {
      throw error;
    }
  }

  @Post('/updatePassword')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: UserUpdatePassswordDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @UseGuards(JwtAuthGuard)
  async updatePassword(
    @Request() req,
    @Body() userUpdatePassword: UserUpdatePassswordDto,
    @Res() res: Response,
  ) {
    try {
      const { id } = req.user;
      const user = await this.userService.findOne(id);
      await this.userService.updatePassword(user, userUpdatePassword);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }

  @Post('/forgotPassword')
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Get user success',
  })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  @ApiBody({ type: UserForgotPassswordDto })
  async forgotPassword(
    @Request() req,
    @Body() userForgotPasssword: UserForgotPassswordDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.forgotPassword(userForgotPasssword);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }

  @Post('/resetPassword')
  @ApiBody({ type: UserResetPassswordDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async resetPassword(
    @Request() req,
    @Body() userResetPassswordDto: UserResetPassswordDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.resetPassword(userResetPassswordDto);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }

  @Post('/activeUser')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiBody({ type: ConfirmationUserDto })
  @ApiResponse({ status: HttpStatus.NO_CONTENT })
  async activeUser(
    @Request() req,
    @Body() confirmationUser: ConfirmationUserDto,
    @Res() res: Response,
  ) {
    try {
      await this.userService.confirmationUser(confirmationUser);
      this.logger.debug(`Active user success #${confirmationUser.token}`);
      res.status(HttpStatus.NO_CONTENT).end();
    } catch (error) {
      throw error;
    }
  }

  @Post('/')
  @HttpCode(HttpStatus.OK)
  @ApiBody({ type: CreateUserDto })
  @ApiCreatedResponse({
    description: 'Api create new user',
    type: UserDto,
  })
  async createUser(@Body() usersDto: CreateUserDto) {
    try {
      const user = await this.userService.createUser(usersDto);
      return user.toUserInfo();
    } catch (error) {
      throw error;
    }
  }

  @Patch('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiParam({ name: 'id', type: 'number' })
  @ApiBody({ type: UpdateUserDto })
  @ApiResponse({
    description: 'Api update category',
    type: UpdateUserDto,
    status: HttpStatus.OK
  })
  async updateUser(@Param() params, @Body() usersDto: UpdateUserDto) {
    try {
      const user = await this.userService.updateUser(params.id, usersDto);
      return user;
    } catch (error) {
      throw error;
    }
  }
}
