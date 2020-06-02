import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
} from 'typeorm';
import { BaseEntity } from '../../common/base.entity';

@Entity({ name: 'cities' })
export class CityEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: 'utf8mb4' })
  name!: string;
}
