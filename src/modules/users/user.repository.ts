import { Repository } from 'typeorm';
import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { UserEntity } from './user.entity';
import moment from 'moment';

@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async confirmationUser(user: UserEntity) {
    return this.update(user, {
      confirmationToken: null,
      confirmedAt: moment.utc()
    })
  }
}
