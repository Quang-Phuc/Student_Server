import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RoleEntity } from './role.entity';
import { RoleRepository } from './role.repository';
import { BaseServices } from 'common/base.services';

@Injectable()
export class RoleService extends BaseServices {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: RoleRepository,
  ) {
    super(roleRepository);
  }

  findOne(findData: any): Promise<any> {
    return this.roleRepository.findOne(findData);
  }
}
