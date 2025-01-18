import { MaxLength, MinLength } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

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

@Entity({ name: 'user' })
@Unique(['id', 'taskId'])
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: number;

  @PrimaryGeneratedColumn('increment')
  @Column({ generated: 'rowid' })
  taskId!: number;

  @MinLength(3)
  @MaxLength(500)
  @Column({ type: 'varchar', length: 500 })
  title!: string;

  @MinLength(3)
  @MaxLength(5000)
  @Column({ type: 'varchar', length: 5000 })
  description!: string;

  @Column({ type: 'varchar' })
  createdBy!: string;

  @Column({ type: 'varchar' })
  assign!: string;

  @Column({ type: 'enum', enum: PriorityType })
  priority!: string;

  @Column({ type: 'enum', enum: TaskStatus })
  status!: string;

  @Column({ type: 'varchar' })
  epic!: string;
}
