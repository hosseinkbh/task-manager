import { Entity, Column, ManyToOne, ManyToMany } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'workspaces' })
export class WorkspaceEntity extends BaseEntity {
  @MaxLength(100)
  @MinLength(1)
  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  owner!: UserEntity;

  @ManyToMany(() => UserEntity, { nullable: false })
  memebers!: UserEntity[];
}
