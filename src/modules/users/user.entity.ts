import { Entity, Column, ManyToOne, JoinColumn, DeleteDateColumn, BeforeInsert, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { PasswordTransformer } from './transformer/password.transformer';
import { UserDto } from './dto/UserDto';
import { RoleEntity } from '../roles/role.entity';
import { v4 as uuid } from 'uuid';
import { Exclude } from 'class-transformer';
import { isNullOrUndefined } from 'util';

@Entity({ name: 'users' })
export class UserEntity {
  @PrimaryGeneratedColumn({ type: 'bigint' })
  id: number;

  @Exclude()
  @Column({ transformer: new PasswordTransformer() })
  password: string;

  @Column({ charset: 'utf8mb4' })
  name: string;

  @Column({
    type: 'datetime',
    nullable: true,
  })
  birthday: Date;

  @Column({ default: 1 })
  gender: number;

  @Column({ nullable: true })
  job?: number;

  @Column({ nullable: true })
  city?: number;

  @Column({ unique: true })
  email: string;

  @Column({ name: 'phone_number', nullable: true })
  phoneNumber: string;

  @Column({ type: 'text', nullable: true, charset: 'utf8mb4' })
  about?: string;

  @Column({ nullable: true })
  avatar?: string;

  @Column({ name: 'is_active', default: false })
  isActive?: boolean;

  @Exclude()
  @Column({ default: 2 })
  role_id: number;

  @ManyToOne(
    () => RoleEntity,
    role => role.users,
    { lazy: true },
  )
  @JoinColumn({ name: 'role_id', referencedColumnName: 'id' })
  role: RoleEntity;

  @Exclude()
  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;

  @Exclude()
  @Column({ name: 'confirmation_token', nullable: true })
  confirmationToken: string;

  @Exclude()
  @Column({ type: 'timestamp', name: 'confirmed_at', nullable: true })
  confirmedAt: Date;

  @Exclude()
  @Column({ name: 'confirmation_sent_at', nullable: true })
  confirmedSendAt: Date;

  @Exclude()
  @Column({ name: 'reset_password_token', nullable: true })
  resetPasswordToken: string;

  @Exclude()
  @Column({ type: 'timestamp', name: 'reset_password_sent_at', nullable: true })
  resetPasswordSentAt: Date;

  @BeforeInsert()
  setConfirmationToken() {
    if (isNullOrUndefined(this.role_id)) {
      this.confirmationToken = uuid();
    }
  }

  @Exclude()
  @CreateDateColumn({
    name: 'created_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  createdDate?: Date;

  @Exclude()
  @UpdateDateColumn({
    name: 'updated_at',
    precision: null,
    type: 'timestamp',
    default: () => 'CURRENT_TIMESTAMP',
  })
  updatedAt?: Date;

  public async toUserInfo(): Promise<UserDto> {
    const userDto = new UserDto(
      this.name,
      this.email,
      this.phoneNumber,
      (await this.role).name,
    );
    return userDto;
  }
}
