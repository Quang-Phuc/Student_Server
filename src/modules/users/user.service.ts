import { Injectable, UnauthorizedException, BadRequestException, NotFoundException, Logger, ForbiddenException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { FindConditions } from 'typeorm';
import _, { isNil } from 'lodash';
import { UserEntity } from './user.entity';
import { UserRegisterDto } from './dto/UserRegisterDto';
import { UserDto } from './dto/UserDto';
import { UserRepository } from './user.repository';
import { UserUpdatePassswordDto } from './dto/UserUpdatePasswordDto';
import { UserForgotPassswordDto } from './dto/UserForgotPasswordDto';
import { v4 as uuid } from 'uuid';
import { UtilsService } from '../../providers/utils.service';
import { UserResetPassswordDto } from './dto/UserResetPasswordDto';
import { ConfirmationUserDto } from './dto/ConfirmationTokenDto';
import { UserUpdateProfileDto } from './dto/UserUpdateProfileDto';
import { AwsS3Service } from '../../shared/services/aws-s3.service';
import { CreateUserDto } from './dto/CreateUserDto';
import { UpdateUserDto } from './dto/UpdateUserDto';
import { InjectQueue } from '@nestjs/bull';
import { Queue } from 'bull';

@Injectable()
export class UserService {
  private readonly logger = new Logger(UserService.name);

  constructor(
    @InjectRepository(UserEntity)
    private readonly usersRepository: UserRepository,
    private readonly awsS3Service: AwsS3Service,
    @InjectQueue('userProcessor')
    private readonly userQueue: Queue,
  ) {}

  /**
   * @param  {FindConditions<UserEntity>} findData
   * @returns Promise
   */
  async findOne(findData: FindConditions<UserEntity>): Promise<UserEntity> {
    return this.usersRepository.findOne(findData);
  }

  /**
   * @param  {UserRegisterDto} userRegisterDto
   * @returns Promise
   */
  async registerUser(userRegisterDto: UserRegisterDto): Promise<UserDto> {
    try {
      const newUser = await this.usersRepository.create({
        ...userRegisterDto,
      });

      const resultUser = await this.usersRepository.save(newUser);
      await this.userQueue.add('sendMailConfirmation', {
        to: resultUser.email,
        token: resultUser.confirmationToken,
      });
      const user = await resultUser.toUserInfo();
      return user;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {UserEntity} user
   * @param  {UserUpdatePassswordDto} userUpdatePassswordDto
   * @param  {} userUpdatePassswordDto.currentPassword
   * @param  {} ;if(!isValid
   * @param  {} {thrownewUnauthorizedException(
   * @param  {} ;}if(userUpdatePassswordDto.newPassword!==userUpdatePassswordDto.confimrmPassword
   * @param  {} {thrownewBadRequestException('NewPasswordandconfirmPasswordnotequal'
   * @param  {userUpdatePassswordDto.newPassword}} {password
   * @param  {UserForgotPassswordDto} ;}asyncforgotPassword(userForgotPasssword
   */
  async updatePassword(
    user: UserEntity,
    userUpdatePassswordDto: UserUpdatePassswordDto,
  ): Promise<any> {
    const isValid = await this.validateUser(
      user.email,
      userUpdatePassswordDto.currentPassword,
    );
    if (!isValid) {
      throw new UnauthorizedException();
    }

    if (
      userUpdatePassswordDto.newPassword !==
      userUpdatePassswordDto.confimrmPassword
    ) {
      throw new BadRequestException(
        'NewPassword and confirmPassword not equal',
      );
    }

    this.usersRepository.update(
      { email: user.email },
      { password: userUpdatePassswordDto.newPassword },
    );
  }

  async forgotPassword(userForgotPasssword: UserForgotPassswordDto) {
    try {
      const user = await this.usersRepository.findOne({
        email: userForgotPasssword.email,
      });

      if (!user) {
        throw new NotFoundException('Not found user');
      }
      const token = uuid();

      await this.usersRepository.update(
        { id: user.id },
        { resetPasswordToken: token, resetPasswordSentAt: new Date() },
      );

      await this.userQueue.add('sendMailForgotPassword', {
        to: userForgotPasssword.email,
        token,
      });
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {UserResetPassswordDto} userResetPasssword
   */
  async resetPassword(userResetPasssword: UserResetPassswordDto) {
    try {
      const { password, confirmPassword, token } = userResetPasssword;
      const user = await this.usersRepository.findOne({
        resetPasswordToken: token,
      });

      if (!user) {
        throw new ForbiddenException('Password is change');
      }

      if (password !== confirmPassword) {
        throw new BadRequestException('Password and confirm not match');
      }

      await this.usersRepository.update(
        { id: user.id },
        {
          password: password,
          resetPasswordToken: null,
          resetPasswordSentAt: null,
        },
      );
    } catch (error) {
      throw error;
    }
  }

  /**
   * @param  {string} email
   * @param  {string} password
   */
  async validateUser(email: string, password: string): Promise<UserEntity> {
    const user = await this.findOne({email});
    this.logger.debug(user)
    const isPasswordValid = await UtilsService.validateHash(
      password,
      user && user.password,
    );

    if (!user || !isPasswordValid) {
      throw new UnauthorizedException();
    }
    return user;
  }

  /**
   * @param  {ConfirmationUserDto} confirmationUser
   */
  async confirmationUser(confirmationUser: ConfirmationUserDto) {
    try {
      const user = await this.usersRepository.findOne({
        confirmationToken: confirmationUser.token,
      });

      if (isNil(user)) {
        this.logger.error(`Not found user ${confirmationUser.token}`);
        throw new NotFoundException('Not found user');
      }

      if (user.isActive) {
        this.logger.error(`User is active ${user.id}`);
        throw new BadRequestException('User is actived');
      }

      return this.usersRepository.update(
        { id: user.id },
        {
          isActive: true,
          confirmedAt: new Date(),
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async updateUserProfile(
    id: number,
    userUpdateProfileDto: UserUpdateProfileDto,
  ) {
    try {
      const { avatar: avatarParams, ...updateParams } = userUpdateProfileDto;
      let avatar = null;
      if(avatarParams) {
        avatar = (await this.uploadAvatar(avatarParams, id)).url;
      }
      return this.usersRepository.update(
        { id },
        {
          avatar,
          ...this.permitUpdateProfilePrams(updateParams),
        },
      );
    } catch (error) {
      throw error;
    }
  }

  async uploadAvatar(avatar: string, userId: number) {
    try {
      const resultUpload = await this.awsS3Service.uploadImage(
        avatar,
        `/user/${userId}/avatar/`,
      );
      return {
        url: resultUpload.Key,
      };
    } catch (error) {
      throw error;
    }
  }

  async createUser(createUserDto: CreateUserDto) {
    try {
      const newUser = await this.usersRepository.create({
        ...createUserDto,
      });
      return this.usersRepository.save(newUser);
    } catch (error) {
      throw error;
    }
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    try {
      const user = await this.usersRepository.findOne(id);

      if (isNil(user)) {
        throw new NotFoundException('Not found user');
      }

      return this.usersRepository.update(
        user,
        this.permitUpdatePrams(updateUserDto),
      );
    } catch (error) {
      throw error;
    }
  }

  private permitUpdatePrams(params) {
    return _.omitBy(
      {
        ['role_id']: _.get(params, 'role_id'),
      },
      _.isUndefined,
    );
  }

  private permitUpdateProfilePrams(updateParams) {
    return _.omitBy(
      {
        name: _.get(updateParams, 'name'),
        birthday: _.get(updateParams, 'birthday'),
        city: _.get(updateParams, 'city'),
        job: _.get(updateParams, 'job'),
        about: _.get(updateParams, 'about'),
      },
      _.isUndefined,
    );
  }
}
