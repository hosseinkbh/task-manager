import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { EpicEntity } from './epic.entity';
import { BaseEntity } from './base.entity';

export enum PriorityType {
  HIGH = 'HIGH',
  MEDIUM = 'MEDIUM',
  LOW = 'LOW',
}

export enum TaskStatus {
  TODO = 'TODO',
  IN_PROGRESS = 'IN_PROGRESS',
  DONE = 'DONE',
  ARCHIVE = 'ARCHIVE',
  DELETED = 'DELETED',
}

@Entity({ name: 'tasks' })
export class TaskEntity extends BaseEntity {
  @MaxLength(500)
  @MinLength(1)
  @Column({ type: 'varchar', length: 500, nullable: false })
  title!: string;

  @MaxLength(5000)
  @Column({ type: 'text', length: 5000, nullable: true })
  description?: string | null;

  @ManyToOne(() => UserEntity, { nullable: false })
  createdBy!: UserEntity;

  @ManyToOne(() => UserEntity, { nullable: true })
  assign?: UserEntity | null;

  @ManyToOne(() => EpicEntity, { nullable: true })
  epic?: EpicEntity | null;

  @Column({ type: 'enum', enum: PriorityType, default: PriorityType.MEDIUM })
  priority?: PriorityType;

  @Column({ type: 'enum', enum: TaskStatus, default: TaskStatus.TODO })
  status?: TaskStatus;
}
