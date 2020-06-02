import { Entity, PrimaryColumn } from 'typeorm';

@Entity({ name: 'role_permissions' })
export class RolePermissionEntity {
  @PrimaryColumn({ unique: true })
  role_id!: number;

  @PrimaryColumn({ unique: true })
  permission_id!: number;
}
