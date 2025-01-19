import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  ManyToOne,
  ManyToMany,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user';

@Entity({ name: 'workspaces' })
export class WorkspaceEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @MaxLength(100)
  @MinLength(1)
  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  owner!: UserEntity;

  @ManyToMany(() => UserEntity, { nullable: false })
  memebers!: UserEntity[];

  @CreateDateColumn()
  createdAt!: Date;

  @UpdateDateColumn()
  updatedAt!: Date;
}
