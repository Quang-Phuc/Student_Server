import { Entity, Column, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { UserEntity } from '../users/user.entity';
import { PermissionsEntity } from '../permissions/permission.entity';

@Entity({ name: 'roles' })
export class RoleEntity extends BaseEntity {
  @Column({ unique: true })
  name: string;

  @OneToMany(
    () => UserEntity,
    user => user.role,
  )
  users: UserEntity[];

  @ManyToMany(() => PermissionsEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
  })
  permissions: PermissionsEntity[];
}
