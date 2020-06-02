import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany, ManyToMany, JoinTable, JoinColumn, DeleteDateColumn } from 'typeorm';
import { BaseEntity } from '../../common/base.entity';
import { DocumentEntity } from '../documents/document.entity';

@Entity({ name: 'categories' })
export class CategoryEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ charset: 'utf8mb4' })
  name!: string;

  @ManyToOne(
    () => CategoryEntity,
    category => category.categories,
  )
  parent: CategoryEntity;

  @OneToMany(
    () => CategoryEntity,
    category => category.parent,
    { nullable: true },
  )
  @JoinColumn({
    name: 'parent_id`',
    referencedColumnName: 'id',
  })
  categories: CategoryEntity[];

  @ManyToMany(() => DocumentEntity)
  @JoinTable({
    name: 'document_categories',
    joinColumn: {
      name: 'category_id',
      referencedColumnName: 'id',
    },
    inverseJoinColumn: {
      name: 'document_id',
      referencedColumnName: 'id',
    },
  })
  documents: DocumentEntity[];

  @DeleteDateColumn({ name: 'deleted_at', type: 'timestamp', nullable: true })
  deletedAt?: Date;
}
