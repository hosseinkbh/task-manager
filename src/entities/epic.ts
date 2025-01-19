import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user';

@Entity({ name: 'epics' })
export class EpicEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @MaxLength(500)
  @MinLength(1)
  @Column({ type: 'varchar', length: 500, nullable: false })
  title!: string;

  @MaxLength(5000)
  @Column({ type: 'text', length: 5000, nullable: true })
  description?: string | null;

  @ManyToOne(() => UserEntity, { nullable: false })
  createdBy!: UserEntity;

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
