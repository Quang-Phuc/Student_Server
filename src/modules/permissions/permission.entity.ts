import { Entity, Column, ManyToMany, JoinTable } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { RoleEntity } from '../roles/role.entity';

@Entity({ name: 'permissions' })
export class PermissionsEntity extends BaseEntity {
  @Column()
  model: string;

  @Column()
  action: string;

  @ManyToMany(() => RoleEntity)
  @JoinTable({
    name: 'role_permissions',
    joinColumn: {
      name: 'permission_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'role_id',
      referencedColumnName: 'id',
    },
  })
  roles: RoleEntity[];
}
