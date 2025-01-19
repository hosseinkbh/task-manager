import { Entity, Column, ManyToOne } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'epics' })
export class EpicEntity extends BaseEntity {
  @MaxLength(500)
  @MinLength(1)
  @Column({ type: 'varchar', length: 500, nullable: false })
  title!: string;

  @MaxLength(5000)
  @Column({ type: 'text', length: 5000, nullable: true })
  description?: string | null;

  @ManyToOne(() => UserEntity, { nullable: false })
  createdBy!: UserEntity;
}
