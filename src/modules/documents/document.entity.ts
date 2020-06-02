import { Entity, Column, PrimaryGeneratedColumn, ManyToMany, JoinTable, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { CategoryEntity } from '../categories/category.entity';

export enum Status {
  Pending = 0,
  Active = 1,
  Reject = 2
}

@Entity({ name: 'documents' })
export class DocumentEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  language: number;

  @Column()
  university: string;

  @Column({ nullable: true })
  price: number;

  @Column({ name: 'start_page_preview' })
  startPagePreview: number;

  @Column({ name: 'end_page_preview' })
  endPagePreview: number;

  @Column({ name: 'attached_file', nullable: true })
  attachedFile: string;

  @Column({name: 'preview_attached_file', nullable: true})
  previewAttachedFile: string;

  @Column({ name: 'is_vip', default: false })
  isVip: boolean;

  @Column({ nullable: true })
  description: string;

  @Column()
  creater: number;

  @Column({ nullable: true })
  image: string;

  @Column({
    type: 'simple-enum',
    enum: Status,
    default: Status.Pending,
    nullable: true,
  })
  status: number;

  @Column({ name: 'is_active', default: false })
  isActive: boolean;

  @ManyToMany(() => CategoryEntity)
  @JoinTable({
    name: 'document_categories',
    joinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
  })
  categories: CategoryEntity[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
