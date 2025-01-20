import { Column, Entity, ManyToMany, ManyToOne } from 'typeorm';
import { MaxLength, MinLength } from 'class-validator';
import { UserEntity } from './user.entity';
import { BaseEntity } from './base.entity';

@Entity({ name: 'boards' })
export class BoardEntity extends BaseEntity {
  @MaxLength(100)
  @MinLength(1)
  @Column({ type: 'varchar', length: 100, nullable: false })
  name!: string;

  @ManyToOne(() => UserEntity, { nullable: false })
  owner!: string;

  @ManyToMany(() => UserEntity, { nullable: true })
  members!: string[];
}
